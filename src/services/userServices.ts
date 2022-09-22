import axios from "axios";

const userServices = axios.create({
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
  return await userServices.post("/auth/sign-in", body);
};

const signUp = async (body: SignUpTypes) => {
  return await userServices.post("/auth/sign-up", body);
};

export default { signIn, signUp };
