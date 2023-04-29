"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BiEnvelope, BiLock, BiUserCircle } from "react-icons/bi";
import useFilePreview from "@/hooks/useFilePreview";
import FormControl from "@/components/Form/FormControl";
import FormLabel from "@/components/Form/FormLabel";
import { signUpRequest } from "@/services/user";

type FieldValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: FileList;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<FieldValues>();

  const [filePreview] = useFilePreview(watch("profilePicture"));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await signUpRequest(data);

      if(response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[380px] shadow-inner rounded-md bg-neutral-600 pt-8 p-4 animate-fade">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-col mb-4">
            <span className="text-white text-xl mb-4">
              Select a profile picture
            </span>
            <label
              htmlFor="file"
              className="w-32 h-32 rounded-full hover:cursor-pointer group outline outline-purple-500 outline-offset-4 outline-3"
            >
              <img
                src={filePreview}
                className="w-32 h-32 group-hover:opacity-60 object-cover rounded-full mb-4"
                alt="preview image"
              />
            </label>
            <input
              type="file"
              id="file"
              {...register("profilePicture")}
              hidden
            />
          </div>

          <div className="flex items-center relative mb-4">
            <FormControl
              type="text"
              id="username"
              placeholder="Username"
              register={register("username")}
            />
            <FormLabel htmlFor="username">
              <BiUserCircle />
            </FormLabel>
          </div>

          <div className="flex items-center relative mb-4">
            <FormControl
              type="text"
              id="email"
              placeholder="E-mail"
              register={register("email")}
            />
            <FormLabel htmlFor="email">
              <BiEnvelope />
            </FormLabel>
          </div>

          <div className="flex items-center relative mb-4">
            <FormControl
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              register={register("password")}
            />
            <FormLabel htmlFor="password">
              <BiLock />
            </FormLabel>
          </div>

          <div className="flex items-center relative mb-4">
            <FormControl
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              register={register("confirmPassword")}
            />
            <FormLabel htmlFor="confirmPassword">
              <BiLock />
            </FormLabel>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition duration-300"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}
