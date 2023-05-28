"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoDuplicateOutline, IoImagesOutline } from "react-icons/io5";
import useFilePreview from "@/hooks/useFilePreview";
import {
  createBoardRequest,
  uploadBoardBackgroundRequest,
} from "@/services/board";
import { customRandom, random, urlAlphabet } from "nanoid";

type FieldValues = {
  name: string;
  media: FileList;
};

export default function NewBoardForm({ setBoards }: any) {
  const { handleSubmit, register, watch, resetField } = useForm<FieldValues>();
  const [flipped, setFlipped] = useState<boolean>(false);

  const file = watch("media");
  const [preview] = useFilePreview(file);

  const onSubmit: SubmitHandler<FieldValues> = async ({ name, media }) => {
    try {
      const formData = new FormData();

      let backgroundUrl = null;

      if (media.length > 0) {
        formData.append("media", media[0]);
        const response = await uploadBoardBackgroundRequest(formData);

        backgroundUrl = response.data;
      }

      const boardURL = customRandom(urlAlphabet, 12, random);

      const newBoard = {
        name,
        url: boardURL(),
        background: backgroundUrl,
      };

      const response = await createBoardRequest(newBoard);

      if (response.status !== 201) {
        return;
      }

      setBoards((prev: any) => [...prev, newBoard]);
      resetField("name");
      resetField("media");
      setFlipped(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-44 w-full" onClick={() => setFlipped(true)}>
      <div
        className={`group absolute h-full w-full cursor-pointer rounded-lg border-2 border-neutral-600 bg-neutral-600/20 transition duration-1000 [backface-visibility:hidden] [transform-style:preserve-3d] hover:border-neutral-500 ${
          flipped && "[transform:rotateY(-180deg)]"
        }`}
      >
        <div className="flex h-full w-full items-center justify-center font-alt text-neutral-600 transition duration-1000 group-hover:text-neutral-500">
          <IoDuplicateOutline className="text-4xl" />
        </div>
      </div>
      <div
        className={`absolute h-full w-full rounded-lg bg-neutral-600/20 transition duration-1000 [backface-visibility:hidden] [transform-style:preserve-3d]  ${
          flipped ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
        }`}
      >
        <div className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-lg transition hover:shadow-lg">
          {preview && (
            <img
              alt=""
              src={preview}
              className="h-full object-cover transition group-hover:scale-125 group-hover:transform"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 to-neutral-700/20 p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col gap-2"
            >
              <label
                htmlFor="background"
                className="flex h-3/4 w-full cursor-pointer items-center justify-center rounded-lg"
              >
                <IoImagesOutline className="text-4xl text-neutral-400" />
              </label>
              <input
                hidden
                type="file"
                id="background"
                {...register("media")}
              />

              <div className="flex items-center justify-between">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter board name"
                  className="w-3/4 rounded-md border-2 border-neutral-500/20 bg-transparent p-1 font-alt text-lg font-semibold text-neutral-400/80 outline-0 transition focus:border-neutral-500/50 group-hover:text-neutral-300/80"
                />

                <button
                  type="submit"
                  className="rounded-md border-2 border-violet-600 bg-violet-600 p-1 font-alt text-neutral-200 hover:border-violet-600/50 hover:bg-violet-600/50"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
