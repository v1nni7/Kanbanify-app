"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import { FormGroup, FormControl, FormLabel } from "../(components)/Form";

type FieldValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const router = useRouter();
  const [loading, toggleLoading] = useToggle(false);
  const { handleSubmit, register } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    try {
      toggleLoading();
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/boards",
      });

      if (!response?.ok) {
        return;
      }

      router.push("/boards");
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[380px] animate-fade rounded-md p-8">
        <div className="flex flex-col items-center justify-center mb-4">
          {/*  <img
            className="w-32 h-32 outline outline-offset-4 outline-3 outline-blue-500 rounded-full object-cover"
            src="https://cdn.discordapp.com/attachments/1013165623188148234/1042425389684895874/WhatsApp_Image_2022-11-12_at_16.45.17.jpeg"
            alt=""
          /> */}
          <h1 className="text-2xl font-bold text-white mt-4">Sign in</h1>
          {/* <p className="text-md text-white mt-2">Welcome back {user}!</p> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="E-mail"
              register={register("email")}
              disabled={loading}
            />

            <FormLabel htmlFor="email">
              <BiEnvelope className="text-3xl" />
            </FormLabel>
          </FormGroup>

          <FormGroup className="flex items-center relative mb-2">
            <FormControl
              type="password"
              placeholder="Password"
              register={register("password")}
              disabled={loading}
            />

            <FormLabel htmlFor="password">
              <BiLock className="text-3xl" />
            </FormLabel>
          </FormGroup>

          <div className="mb-4">
            <span className="text-blue-500 hover:text-blue-400 transition hover:cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-12 flex justify-center items-center rounded-md text-slate-200 transition bg-blue-500 hover:bg-blue-600 mb-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <TailSpin width={30} height={30} color="#ffffff" />
            ) : (
              "Submit"
            )}
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
