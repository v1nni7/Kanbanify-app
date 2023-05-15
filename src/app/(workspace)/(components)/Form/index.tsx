import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { customRandom, random, urlAlphabet } from "nanoid";
import { createBoardRequest } from "@/services/board";
import FormControl from "./FormControl";
import FormGroup from "./FormGroup";

type FieldValues = {
  name: string;
  background: string;
};

type FormProps = {
  boards: any;
  setBoards: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function FormCreateBoard({ boards, setBoards }: FormProps) {
  const { handleSubmit, register } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const url = customRandom(urlAlphabet, 12, random);

      const response = await createBoardRequest({ ...data, url: url() });

      if (response.status === 201) {
        setBoards([...boards, { ...data, url: url() }]);
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-64 shadow-inner absolute bg-slate-600 rounded-md top-14 right-0 p-4"
    >
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Title"
          register={register("name")}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Background"
          register={register("background")}
        />
      </FormGroup>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-400 hover:bg-blue-500 text-slate-50 transition p-1"
      >
        Create
      </button>
    </form>
  );
}
