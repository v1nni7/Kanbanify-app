import axios from "axios";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function getAPIClient(ctx?: GetServerSidePropsContext) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use(async (config) => {
    const {
      user: { accessToken },
    } = await getSession();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  });

  return api;
}
