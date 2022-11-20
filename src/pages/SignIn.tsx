import { Form, Formik } from "formik";
import { ValidationError } from "yup";
import { toast, ToastContainer } from "react-toastify";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "../assets/schema/authSchemaValidate";
import userServices from "../services/userServices";

interface SigninFormValues {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    stayLoggedIn: false,
  };

  const handleSubmit = async (data: SigninFormValues) => {
    try {
      await signInSchema.validate(data);

      const response = await userServices.signIn(data);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/workspace");
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
        return;
      }

      toast.error(error.response.data);
    }
  };

  return (
    <>
      <section className="signin">
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {({ handleChange, values, isSubmitting }) => (
            <Form className="form-horizontal">
              <div className="form-group form-flex">
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  className="form-control"
                  placeholder="E-mail"
                  onChange={handleChange("email")}
                  value={values.email}
                  disabled={isSubmitting}
                />
                <label htmlFor="email" className="form-label">
                  <BiEnvelope />
                </label>
              </div>
              <div className="form-group">
                <div className="form-flex">
                  <input
                    id="password"
                    type="password"
                    autoComplete="password"
                    className="form-control"
                    placeholder="Senha"
                    onChange={handleChange("password")}
                    value={values.password}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="password" className="form-label">
                    <BiLockAlt />
                  </label>
                </div>

                <Link to="/" className="form-recover-password">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  Entrar
                </button>
              </div>

              <div className="form-group">
                <hr className="form-divisor" />
              </div>

              <div className="form-group text-align-center">
                <Link className="form-link-signup" to="/signup">
                  Crie sua conta
                </Link>
                <button className="form-btn-google">
                  <FcGoogle />
                  Entre com Google
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default SignIn;
