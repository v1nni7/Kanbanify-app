import { object, string, boolean, ref } from "yup";

export interface signInDataTypes {
  email: string;
  password: string;
}

export interface signUpDataTypes extends signInDataTypes {
  username: string;
  confirmPassword: string;
}

const signUp = (data: signUpDataTypes) => {
  const schema = object({
    termConditions: boolean()
      .oneOf([true], "You must accept the terms"),
    confirmPassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    password: string().min(6).required("Password is required"),
    email: string().email().required("Email is required"),
    username: string().required("Username is required"),
  });
  return schema.validate(data);
};

const signIn = (data: signInDataTypes) => {
  const schema = object({
    email: string().email().required("Email is required"),
    password: string().min(6).required("Password is required"),
  });
  return schema.validate(data);
};

export default { signUp, signIn };
