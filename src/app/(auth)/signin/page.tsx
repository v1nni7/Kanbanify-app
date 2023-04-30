"use client";

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";

type FieldValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const { signIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
    }
  };

  const user = "Vinicius";

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[380px] animate-fade rounded-md p-8">
        <div className="flex flex-col items-center justify-center mb-4">
          <img
            className="w-32 h-32 outline outline-offset-4 outline-3 outline-blue-500 rounded-full object-cover"
            src="https://cdn.discordapp.com/attachments/1013165623188148234/1042425389684895874/WhatsApp_Image_2022-11-12_at_16.45.17.jpeg"
            alt=""
          />
          <h1 className="text-2xl font-bold text-white mt-4">Sign in</h1>
          <p className="text-md text-white mt-2">Welcome back {user}!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder="E-mail"
              {...register("email")}
              autoComplete="off"
              className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10"
            />

            <label
              className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
              htmlFor=""
            >
              <BiEnvelope className="text-3xl" />
            </label>
          </div>
          <div className="flex items-center relative mb-2">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              autoComplete="off"
              className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10"
            />

            <label
              className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
              htmlFor=""
            >
              <BiLock className="text-3xl" />
            </label>
          </div>
          <div className="mb-4">
            <span className="text-blue-500 hover:text-blue-400 transition hover:cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-12 flex justify-center items-center rounded-md text-slate-200 transition bg-blue-500 hover:bg-blue-600 mb-2"
          >
            {isLoading ? <TailSpin color="#ffffff" /> : "Submit"}
          </button>
          <Link
            className="text-center block text-blue-500 hover:text-blue-400"
            href="/signup"
          >
            Create account
          </Link>
        </form>
      </div>
    </div>
  );
}
