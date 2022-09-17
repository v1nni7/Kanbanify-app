import { object, string, boolean, ref } from "yup";

const workspaceSchema = (data: any) => {
  const schema = object({
    background: string().required("Background is required"),
    name: string().required("Workspace name is required"),
  });
  return schema.validate(data);
};

export default { workspaceSchema };
