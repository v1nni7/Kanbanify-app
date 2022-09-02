import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

interface signUpTypes {
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

const signUp = async (data: signUpTypes) => {
  const promise = await api.post("/sign-up");
  return promise;
};

export default { getAllWorkspaces, getWorkspaceData };
