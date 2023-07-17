'use client'

import { useCallback, useMemo } from 'react'
import { withHistory } from 'slate-history'
import {
  Descendant,
  Editor,
  createEditor,
  Element as SlateElement,
  Transforms,
} from 'slate'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import isHotkey from 'is-hotkey'

import { Button } from './Editor'
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaItalic,
  FaUnderline,
} from 'react-icons/fa'

// ! Remover as tipagens ANY do código

const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export default function TextAreaEditor() {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const handleKeyDown: any = (event: KeyboardEvent) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  return (
    <>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => op.type !== 'set_selection',
          )

          if (isAstChange) {
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
          }
        }}
      >
        <div className="flex items-center gap-2 rounded-t-md border-b-2 border-neutral-500 bg-neutral-600 px-2 py-4">
          <MarkButton format="bold">
            <FaBold />
          </MarkButton>
          <MarkButton format="italic">
            <FaItalic />
          </MarkButton>
          <MarkButton format="underline">
            <FaUnderline />
          </MarkButton>
          <MarkButton format="code">
            <FaCode />
          </MarkButton>
          <BlockButton format="left">
            <FaAlignLeft />
          </BlockButton>
          <BlockButton format="center">
            <FaAlignCenter />
          </BlockButton>
          <BlockButton format="right">
            <FaAlignRight />
          </BlockButton>
          <BlockButton format="justify">
            <FaAlignJustify />
          </BlockButton>
        </div>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          placeholder="Envie uma mensagem..."
          className="rounded-b-md bg-neutral-600 p-2 font-normal outline-none"
        />
      </Slate>
    </>
  )
}

const MarkButton = ({ format, icon, children }: any) => {
  const editor = useSlate()

  const handleMouseDown: any = (event: MouseEvent) => {
    event.preventDefault()

    toggleMark(editor, format)
  }

  return (
    <Button active={isMarkActive(editor, format)} onMouseDown={handleMouseDown}>
      {children}
    </Button>
  )
}

function BlockButton({ format, icon, children }: any) {
  const editor = useSlate()

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    toggleBlock(editor, format)
  }

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      )}
      onMouseDown={handleMouseDown}
    >
      {children}
    </Button>
  )
}

function isBlockActive(editor: any, format: any, blockType = 'type') {
  const { selection } = editor

  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-ignore
        n[blockType] === format,
    }),
  )

  return !!match
}

function toggleBlock(editor: any, format: string) {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })

  let newProperties: Partial<SlateElement>

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      // @ts-ignore
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }

  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

function toggleMark(editor: any, format: string) {
  const isActive = isMarkActive(editor, format)

  isActive
    ? Editor.removeMark(editor, format)
    : Editor.addMark(editor, format, true)
}

function isMarkActive(editor: any, format: string) {
  const marks: any = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

// Text Leafs
function Leaf({ attributes, children, leaf }: any) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = (
      <code className="bg-neutral-700 px-1 py-0.5 text-red-400">
        {children}
      </code>
    )
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

function Element({ attributes, children, element }: any) {
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const initialValue: Descendant[] = [
  {
    // @ts-ignore
    type: 'paragraph',
    align: 'center',
    children: [
      {
        text: 'Envie-nos um texto sobre seu feedback, problema ou sugestão!',
      },
    ],
  },
]
