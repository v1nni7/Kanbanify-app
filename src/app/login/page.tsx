"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { AuthContext } from "@/context/AuthContext";
import FormControl from "@/components/Form/FormControl";
import FormLabel from "@/components/Form/FormLabel";

type FieldValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await signIn(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[380px] shadow-inner rounded-md bg-neutral-600 pt-8 p-4 animate-fade">
        <div className="flex items-center flex-col mb-4">
          <img
            className="w-32 h-32 object-cover rounded-full outline outline-purple-500 outline-offset-4 outline-3 mb-4"
            src="https://cdn.discordapp.com/attachments/1013165623188148234/1042425389684895874/WhatsApp_Image_2022-11-12_at_16.45.17.jpeg"
            alt=""
          />

          <h1 className="text-white text-4xl">Login</h1>
          <p className="text-neutral-300 text-md mb-4">
            Welcome back Vinicius!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center relative mb-4">
            <FormControl
              id="email"
              type="text"
              placeholder="E-mail"
              autoComplete="off"
              register={register("email")}
            />

            <FormLabel htmlFor="email">
              <BiEnvelope />
            </FormLabel>
          </div>
          <div className="flex items-center relative mb-1">
            <FormControl
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              register={register("password")}
            />
            <FormLabel htmlFor="password">
              <BiLockAlt />
            </FormLabel>
          </div>

          <label
            /* href="/recover-password" */
            className="block mb-5 text-purple-400 hover:underline hover:cursor-pointer"
          >
            Forgot password?
          </label>

          <button
            type="submit"
            className="w-full h-12 rounded-md flex justify-center items-center text-neutral-200 text-xl bg-purple-500 hover:bg-purple-600 transition mb-2"
          >
            {isLoading ? (
              <TailSpin color="#ffffff" width={32} height={32} />
            ) : (
              "Submit"
            )}
          </button>

          <Link
            className="block text-center text-purple-400 hover:underline"
            href="/signup"
          >
            Create an account
          </Link>
        </form>
      </div>
    </section>
  );
}
