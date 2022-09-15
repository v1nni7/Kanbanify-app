import axios from "axios";

interface signUpDataTypes {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
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

const signUp = async ({email, username, password, confirmPassword}: signUpDataTypes) => {
  const newData = {email, username, password, confirmPassword};

  const promise = await api.post("/sign-up", newData);
  return promise;
};

const signIn = async ({email, password}: signInDataTypes) => {
  const newData = {email, password}

  const promise = await api.post("/sign-in", newData);
  return promise;
};

export default { getAllWorkspaces, getWorkspaceData, signIn, signUp };
