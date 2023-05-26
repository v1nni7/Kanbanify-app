import useUpdateBoard from "@/hooks/useUpdateBoard";
import { SubmitHandler, useForm } from "react-hook-form";

type FieldValues = {
  title: string;
};

export default function InputCreateBoard() {
  const { onSubmitBoard } = useUpdateBoard();
  const { handleSubmit, register } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async ({title}) => {
    try {
      await onSubmitBoard({ title, type: "column" });
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-64 flex-col gap-2 rounded-lg bg-slate-700 p-1"
        >
          <input
            type="text"
            placeholder="New Column"
            {...register("title")}
            className="peer w-full rounded-lg border-2 border-slate-600 bg-transparent p-2 text-slate-200 outline-none transition placeholder:text-slate-200 focus:border-slate-500/80"
          />

          <div className="hidden items-center gap-4 peer-focus:flex peer-focus:animate-fade">
            <button
              type="submit"
              className="rounded-md bg-purple-500/50 px-3 py-1 text-slate-200 transition hover:bg-purple-600/50"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
