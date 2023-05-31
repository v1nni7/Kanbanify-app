import { IoAddOutline, IoEllipsisVerticalSharp } from "react-icons/io5";

type ColumnHeaderProps = {
  title: string;
};

export default function ColumnHeader({ title }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <h2 className="font-alt text-lg font-semibold text-neutral-500">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <button className="rounded-md p-1 transition hover:bg-neutral-700/60">
          <IoAddOutline className="text-xl text-neutral-200" />
        </button>
        <button className="rounded-md p-1 transition hover:bg-neutral-700/60">
          <IoEllipsisVerticalSharp className="text-xl text-neutral-200" />
        </button>
      </div>
    </div>
  );
}
