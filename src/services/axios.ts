import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function getAPIClient(ctx?: GetServerSidePropsContext) {
  const { "kanban.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
