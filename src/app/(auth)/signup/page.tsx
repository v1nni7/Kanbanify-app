"use client";

import Link from "next/link";
import { signUpRequest } from "@/services/user";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import { useEffect } from "react";

type FieldValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Hello World")
    try {
      const response = await signUpRequest(data);

      if (response.status === 201) {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[380px] animate-fade rounded-md p-8">
        <div className="flex flex-col items-center justify-center mb-4">
          {/* <img
            className="w-32 h-32 outline outline-offset-4 outline-3 outline-blue-500 rounded-full object-cover"
            src="https://cdn.discordapp.com/attachments/1013165623188148234/1042425389684895874/WhatsApp_Image_2022-11-12_at_16.45.17.jpeg"
            alt=""
          /> */}
          <h1 className="text-2xl font-bold text-white mt-4">Sign up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              autoComplete="current-username"
              className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10"
            />

            <label
              className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
              htmlFor=""
            >
              <BiUser className="text-3xl" />
            </label>
          </div>
          <div className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder="E-mail"
              {...register("email")}
              autoComplete="current-email"
              className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10"
            />

            <label
              className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
              htmlFor=""
            >
              <BiEnvelope className="text-3xl" />
            </label>
          </div>
          <div className="flex items-center relative mb-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              autoComplete="current-password"
              className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10"
            />

            <label
              className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
              htmlFor=""
            >
              <BiLock className="text-3xl" />
            </label>
          </div>
          <div className="flex items-center relative mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              autoComplete="current-confirmPassword "
              className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10"
            />

            <label
              className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
              htmlFor=""
            >
              <BiLock className="text-3xl" />
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-md text-slate-200 transition bg-blue-500 hover:bg-blue-600 mb-2"
          >
            Submit
          </button>
          <Link
            className="text-center block text-blue-500 hover:text-blue-400"
            href="/signin"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}
