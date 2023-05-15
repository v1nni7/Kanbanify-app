import axios from "axios";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function getAPIClient(ctx?: GetServerSidePropsContext) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.user.token) {
      config.headers["Authorization"] = `Bearer ${session?.user.token}`;
    }

    return config;
  });

  return api;
}
