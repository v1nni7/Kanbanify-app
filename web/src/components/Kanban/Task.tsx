import { Draggable } from "react-beautiful-dnd";

export default function Task({task, index}: any) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {({dragHandleProps,draggableProps,innerRef}) => (
        <div className="mb-2 rounded-lg bg-neutral-700 p-2" {...draggableProps} {...dragHandleProps} ref={innerRef}>
          <img
              src="http://localhost:5000/uploads/laptop.jpg"
              alt=""
              className="max-h-32 w-full rounded-lg object-cover"
            />

            <div className="mt-2">
              <h1 className="text-neutral-100">{task.title}</h1>
              <p className="text-neutral-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
        </div>
      )}
    </Draggable>
  )
}