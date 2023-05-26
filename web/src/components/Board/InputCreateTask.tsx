import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BoardContext } from "@/context/BoardContext";
import useUpdateBoard from "@/hooks/useUpdateBoard";

interface InputCreateTaskProps {
  columnId: string;
}

type FieldValues = {
  title: string;
};

export default function InputCreateTask({ columnId }: InputCreateTaskProps) {
  const { onSubmitBoard } = useUpdateBoard();
  const { setBoard } = useContext(BoardContext);
  const { handleSubmit, register, resetField } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async ({title}: FieldValues) => {
    try {
      await onSubmitBoard({ title, type: "task", columnId });
    } catch (error) {
      console.log(error);
    } finally {
      resetField("title");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-1">
      <input
        type="text"
        placeholder="New task"
        {...register("title")}
        className="peer h-10 w-full rounded-md border-2 border-slate-700 bg-transparent p-2 text-slate-200 outline-0 transition focus:border-slate-600 focus:bg-slate-600/50"
      />
      <div className="hidden items-center gap-4 peer-focus:flex peer-focus:animate-fade">
        <button type="submit" className="rounded-md bg-purple-500/50 px-3 py-1 text-slate-200 transition hover:bg-purple-600/50">
          Create
        </button>
      </div>
    </form>
  );
}
