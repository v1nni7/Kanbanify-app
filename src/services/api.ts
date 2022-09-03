import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

interface userDataTypes {
  email: string;
  password: string;
}

const getAllWorkspaces = async () => {
  const promise = await api.get("/workspaces");
  return promise;
};

const getWorkspaceData = async (id: string) => {
  const promise = await api.get(`/workspace/${id}`);
  return promise;
};

const signUp = async (data: userDataTypes) => {
  const promise = await api.post("/sign-up");
  return promise;
};

const signIn = async (data: userDataTypes) => {
  const promise = await api.post("/sign-in");
  return promise;
};

export default { getAllWorkspaces, getWorkspaceData };
