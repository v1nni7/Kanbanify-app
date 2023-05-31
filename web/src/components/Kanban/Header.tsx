import { IoAddOutline, IoEllipsisVerticalSharp } from "react-icons/io5";

type ColumnHeaderProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ title, isOpen, setIsOpen }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <h2 className="font-alt text-lg font-semibold text-neutral-500">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-1 transition hover:bg-neutral-700/60"
        >
          <IoAddOutline className="text-xl text-neutral-200" />
        </button>
        <button className="rounded-md p-1 transition hover:bg-neutral-700/60">
          <IoEllipsisVerticalSharp className="text-xl text-neutral-200" />
        </button>
      </div>
    </div>
  );
}
