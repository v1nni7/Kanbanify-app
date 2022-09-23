import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

type SignInTypes = {
  email: string;
  password: string;
  stayLoggedIn: boolean;
};

type SignUpTypes = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};

const signIn = async (body: SignInTypes) => {
  return await api.post("/auth/sign-in", body);
};

const signUp = async (body: SignUpTypes) => {
  return await api.post("/auth/sign-up", body);
};

export default { signIn, signUp };
