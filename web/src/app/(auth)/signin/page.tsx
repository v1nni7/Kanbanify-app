"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEnvelope, BiLock } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";

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
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex w-80 flex-col gap-4">
        <h2 className="text-center font-alt text-2xl text-neutral-300">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="relative flex items-center text-neutral-500">
            <input
              id="email"
              type="text"
              autoComplete="off"
              placeholder="Email"
              {...register("email")}
              className="peer h-12 w-full rounded-lg border-2 border-neutral-500 bg-transparent p-2 pl-10 text-xl font-semibold outline-none transition placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500/60 focus:placeholder:text-neutral-500/50"
            />
            <label
              htmlFor="email"
              className="absolute ml-2 text-3xl peer-focus:text-neutral-500/60"
            >
              <BiEnvelope />
            </label>
          </div>

          <div className="relative flex items-center text-neutral-500">
            <input
              id="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              {...register("password")}
              className="peer h-12 w-full rounded-lg border-2 border-neutral-500 bg-transparent p-2 pl-10 text-xl font-semibold outline-none transition placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500/60 focus:placeholder:text-neutral-500/50"
            />
            <label
              htmlFor="password"
              className="absolute ml-2 text-3xl peer-focus:text-neutral-500/60"
            >
              <BiLock />
            </label>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-violet-500 p-2 font-alt text-xl font-semibold text-neutral-300 transition hover:bg-violet-500/60 focus:bg-violet-500/60 disabled:bg-violet-400"
          >
            Submit
          </button>

          <div className="text-center">
            <Link href="/signup" className="text-violet-500 hover:underline">
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
