import axios from "axios";

interface signUpDataTypes {
  email: string;
  password: string;
  username: string;
}

interface signInDataTypes {
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const getAllWorkspaces = async () => {
  const promise = await api.get("/workspaces");
  return promise;
};

const getWorkspaceData = async (id: string) => {
  const promise = await api.get(`/workspace/${id}`);
  return promise;
};

const signUp = async (data: signUpDataTypes) => {
  const promise = await api.post("/sign-up", data);
  return promise;
};

const signIn = async (data: signInDataTypes) => {
  const promise = await api.post("/sign-in");
  return promise;
};

export default { getAllWorkspaces, getWorkspaceData, signIn, signUp };
