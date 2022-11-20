import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { BiUser, BiEnvelope, BiLock, BiLockOpen } from "react-icons/bi";
import userServices from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import { signUpSchema } from "../assets/schema/authSchemaValidate";

const SignUp = () => {
  interface SignupFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsConditions: boolean;
  }

  const initialValues: SignupFormValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsConditions: false,
  };

  const navigate = useNavigate();

  const handleSubmit = async (data: SignupFormValues) => {
    try {
      await signUpSchema.validate(data);

      const response = await userServices.signUp(data);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
      }

      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="toast-styled">
        <ToastContainer position="bottom-right" hideProgressBar />
      </div>
      <section className="signup form-centered">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="form-horizontal">
              <div className="form-group form-flex">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Usuário"
                  onChange={handleChange("username")}
                  value={values.username}
                />
                <label htmlFor="username" className="form-label">
                  <BiUser />
                </label>
              </div>
              <div className="form-group form-flex">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="E-mail"
                  onChange={handleChange("email")}
                  value={values.email}
                />
                <label htmlFor="email" className="form-label">
                  <BiEnvelope />
                </label>
              </div>
              <div className="form-group form-flex">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Senha"
                  onChange={handleChange("password")}
                  value={values.password}
                />
                <label htmlFor="password" className="form-label">
                  <BiLockOpen />
                </label>
              </div>
              <div className="form-group form-flex">
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirme sua senha"
                  onChange={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                />
                <label htmlFor="confirmPassword" className="form-label">
                  <BiLock />
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="acceptedTerms"
                  onChange={handleChange("termsConditions")}
                />
                <label htmlFor="acceptedTerms">
                  Aceito os termos de uso e política de privacidade
                </label>
              </div>
              <div className="form-group">
                <button className="form-submit" type="submit">
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default SignUp;
