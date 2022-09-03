import { Formik } from "formik";
import { Centered } from "../../assets/styles/Layout";
import Form from "../../assets/styles/Form";

const Login = () => {
  interface SignInType {
    email: string;
    password: string;
    stayConnected: boolean;
  }

  const signInValues: SignInType = {
    email: "",
    password: "",
    stayConnected: false,
  };

  const handleSubmit = (signIn: SignInType) => {
    try {
      
    } catch (error) {
      
    }
  };

  return (
    <>
      <Centered>
        <Formik onSubmit={handleSubmit} initialValues={signInValues}>
          {({ handleBlur, handleChange, values }) => (
            <>
              <Form.Horizontal>
                <Form.Title>Entrar</Form.Title>

                <Form.Group>
                  <Form.Control
                    id="email"
                    onChange={handleChange("email")}
                    value={values.email}
                  />
                  <Form.Label
                    htmlFor="email"
                    filled={values.email ? false : true}
                  >
                    Email
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    id="password"
                    onChange={handleChange("password")}
                    value={values.password}
                  />
                  <Form.Label
                    htmlFor="email"
                    filled={values.password ? false : true}
                  >
                    Senha
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Checkbox>
                    <input id="connected" type="checkbox" />
                    <label htmlFor="connected">Mantenha-se conectado</label>
                  </Form.Checkbox>
                </Form.Group>

                <Form.Group>
                  <Form.Submit type="submit">Enviar</Form.Submit>
                </Form.Group>

                <Form.FlexGroup>
                  <Form.Action to="/recover-password">
                    Recuperar senha
                  </Form.Action>

                  <hr />

                  <Form.Action to="/register">Criar nova conta</Form.Action>
                </Form.FlexGroup>
              </Form.Horizontal>
            </>
          )}
        </Formik>
      </Centered>
    </>
  );
};

export default Login;
