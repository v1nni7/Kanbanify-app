import axios from "axios";

interface SignUpDataTypes {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

interface SignInDataTypes {
  email: string;
  password: string;
}

interface HeadersTypes {
  headers: {
    Authorization: string;
  };
}

interface WorkspacesTypes {
  id: number;
  name: string;
  background: string;
}

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const getBoards = async (headers: HeadersTypes) => {
  const promise = await api.get(`/workspaces`, headers);
  return promise;
};

const createBoard = async (workspaceData: WorkspacesTypes, headers: HeadersTypes) => {
  const promise = await api.post("/workspaces", workspaceData, headers);
  return promise;
};

const signUp = async ({
  email,
  username,
  password,
  confirmPassword,
}: SignUpDataTypes) => {
  const promise = await api.post("/sign-up", {
    email,
    username,
    password,
    confirmPassword,
  });
  return promise;
};

const signIn = async ({ email, password }: SignInDataTypes) => {
  const newData = { email, password };

  const promise = await api.post("/sign-in", newData);
  return promise;
};

export default { getBoards, createBoard, signIn, signUp };
