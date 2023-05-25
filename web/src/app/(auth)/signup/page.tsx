"use client";

import Link from "next/link";
import { signUpRequest } from "@/services/user";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import { FormGroup, FormControl, FormLabel } from "../(components)/Form";
import useToggle from "@/hooks/useToggle";

type FieldValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const router = useRouter();
  const [loading, toggleLoading] = useToggle(false);
  const { handleSubmit, register } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      toggleLoading();
      const response = await signUpRequest(data);

      if (response.status === 201) {
        router.push("/signin");
      }
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
          {/* <img
            className="w-32 h-32 outline outline-offset-4 outline-3 outline-blue-500 rounded-full object-cover"
            src="https://cdn.discordapp.com/attachments/1013165623188148234/1042425389684895874/WhatsApp_Image_2022-11-12_at_16.45.17.jpeg"
            alt=""
          /> */}
          <h1 className="text-2xl font-bold text-white mt-4">Sign up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Username"
              register={register("username")}
              disabled={loading}
            />

            <FormLabel htmlFor="username">
              <BiUser className="text-3xl" />
            </FormLabel>
          </FormGroup>

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
          <FormGroup>
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
          <FormGroup>
            <FormControl
              type="password"
              placeholder="Confirm password"
              register={register("confirmPassword")}
              disabled={loading}
            />

            <FormLabel htmlFor="confirmPassword">
              <BiLock className="text-3xl" />
            </FormLabel>
          </FormGroup>

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
