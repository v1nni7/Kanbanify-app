import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from 'yup';

import "./styles.scss";

const Login = () => {
  interface TypeLoginValues {
    email: string,
    password: string,
    stayConnected: boolean
  }

  interface TypeRegisterValues {
    email: string,
    password: string,
    confirmPassword: string
  }



  const [formIsFlipped, setFormIsFlipped] = useState(false);

  const handleLogin = useCallback(async (data: TypeLoginValues) => {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().min(8, 'Senha curta, por favor insira pelo menos 8 caracteres').required('Informe seu senha!'),
        email: Yup.string().email('Email inválido!').required('Informe seu email!'),
      });
      await schema.validate(data);
      console.log('Requisição sendo enviada para API...')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(`${error.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [])

  const handleRegister = useCallback(async (data: TypeRegisterValues) => {
    try {
      const schema = Yup.object().shape({
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais!'),
        password: Yup.string().min(8, 'Senha curta, por favor insira pelo menos 8 caracteres').required('Informe seu senha!'),
        email: Yup.string().email('Email inválido!').required('Informe seu email!'),
      });
      await schema.validate(data);
      console.log('Requisição sendo enviada para API...')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(`${error.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [])

  const loginInitialValues: TypeLoginValues = {
    email: '',
    password: '',
    stayConnected: false,
  }

  const registerInitialValue: TypeRegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  return (
    <>
      <section className="login">
        <ToastContainer />
        <div className={`flip-form ${formIsFlipped ? 'active' : ''}`}>
          <Formik
            enableReinitialize
            onSubmit={handleLogin}
            initialValues={loginInitialValues}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <Form className="form-horizontal form-front">
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    autoComplete="email"
                    onChange={handleChange("email")}
                  />
                  <label
                    className={`form-label-anim ${values.email ? "focused" : "unfocused"}`}
                    htmlFor="email"
                  >
                    Email
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    autoComplete="current-password"
                    onChange={handleChange("password")}
                  />
                  <label
                    className={`form-label-anim ${values.password ? "focused" : "unfocused"}`}
                    htmlFor="password"
                  >
                    Senha
                  </label>
                </div>
                <div className="form-group">
                  <div className="form-stay-connected">
                    <input
                      type="checkbox"
                      name="stayconnected"
                      id="stayconnected"
                    />
                    <label htmlFor="stayconnected">Mantenha-me conectado</label>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn-submit">
                    Entrar
                  </button>
                </div>
                <div className="form-group">
                  <hr className="form-divisor" />

                  <div className="flex justify-content-center align-items-center">
                    <Link className="form-action-link" to="/">
                      Recuperar senha
                    </Link>
                    <hr className="form-divisor-circle" />
                    <button type="button" className="form-action-link" onClick={() => setFormIsFlipped(!formIsFlipped)}>
                      Criar nova conta
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <Formik
            enableReinitialize
            onSubmit={handleRegister}
            initialValues={registerInitialValue}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <Form className="form-horizontal form-back">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="email"
                    onChange={handleChange("email")}
                  />
                  <label
                    className={`form-label-anim ${values.email ? "focused" : "unfocused"}`}
                    htmlFor=""
                  >
                    Email
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="passwordRegister"
                    className="form-control"
                    autoComplete="current-password"
                    onChange={handleChange("password")}
                  />
                  <label
                    className={`form-label-anim ${values.password ? "focused" : "unfocused"}`}
                    htmlFor="passwordRegister"
                  >
                    Senha
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    autoComplete="current-password"
                    onChange={handleChange("confirmPassword")}
                  />
                  <label
                    className={`form-label-anim ${values.confirmPassword ? "focused" : "unfocused"}`}
                    htmlFor="confirmPassword"
                  >
                    Confirme sua senha
                  </label>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn-submit">
                    Cadastrar
                  </button>
                </div>
                <div className="form-group">
                  <hr className="form-divisor" />

                  <div className="flex justify-content-center">
                    <button type="button" className="form-action-link" onClick={() => setFormIsFlipped(!formIsFlipped)}>
                      Já possui uma conta?
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Login;
