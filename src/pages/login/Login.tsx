import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import "./styles.scss";

const Login = () => {

  const handleLogin = (data: any) => {
    console.log(data)
  }

  // Criando a interface
  interface FormValuesType {
    email: string,
    password: string,
    stayConnected: boolean
  }

  const formInitialValues: FormValuesType = {
    email: '',
    password: '',
    stayConnected: false,
  }

  return (
    <>
      <section className="login">
        <Formik
          enableReinitialize
          onSubmit={handleLogin}
          initialValues={formInitialValues}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <Form className="form-horizontal">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange("email")}
                />
                <label className={`form-label-anim ${values.email ? 'focused' : 'unfocused'}`} htmlFor="">Email</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange("password")}
                />
                <label className={`form-label-anim ${values.password ? 'focused' : 'unfocused'}`} htmlFor="">Senha</label>
              </div>
              <div className="form-group">
                <div className="form-stay-connected">
                  <input type="checkbox" name="stayconnected" id="stayconnected" />
                  <label htmlFor="stayconnected">Mantenha-me conectado</label>
                </div>

                <button type="submit" className="btn-submit">Entrar</button>
              </div>
              <div className="form-group">
                <hr className="form-divisor" />

                <div className="form-flex-wrap">
                  <div className="form-action">
                    <Link className="form-action-link" to="/">Recuperar senha</Link>
                  </div>
                  <hr className="form-divisor-circle" />
                  <div className="form-action">
                    <Link className="form-action-link" to="/register">Criar nova conta</Link>
                  </div>
                </div>
              </div>
            </Form>
          )}

        </Formik>
      </section>
    </>
  );
};

export default Login;
