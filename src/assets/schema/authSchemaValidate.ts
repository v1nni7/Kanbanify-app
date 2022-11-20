import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  termsConditions: Yup.boolean().oneOf([true], "Aceite os termos de condições"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "As senhas não são iguais"),
  password: Yup.string().required("Preencha o campo de senha"),
  email: Yup.string().email().required("Preencha o campo de email"),
  username: Yup.string().required("Preencha o campo de usuário"),
});

const signInSchema = Yup.object().shape({
  password: Yup.string().required("Preencha o campo de senha"),
  email: Yup.string().email("Insira uma email válido").required("Preencha o campo de email"),
});

export { signUpSchema, signInSchema };
