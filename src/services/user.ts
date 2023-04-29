import { api } from "./api";

type SignInRequestData = {
  email: string;
  password: string;
};

type SignUpRequestData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signInRequest = async ({ email, password }: SignInRequestData) => {
  const { data } = await api.post("/user/sign-in", { email, password });
  return data;
};

export const signUpRequest = async ({username, email, password, confirmPassword}: SignUpRequestData) => {
  const response = await api.post("/user/sign-up", {username, email, password, confirmPassword});
  return response;
}

export const getUserRequest = async () => {
  const { data } = await api.get("/user");
  return data;
}
