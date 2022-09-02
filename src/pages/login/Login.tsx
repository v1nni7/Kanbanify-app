import { Formik } from "formik";
import { Centered } from "../../assets/styles/Layout";
import Form from "../../assets/styles/Form";

const Login = () => {
  interface SignInType {
    email: string;
    password: string;
  }

  const signInValues: SignInType = {
    email: "",
    password: "",
  };

  const handleSubmit = (signIn: SignInType) => {};

  return (
    <>
      <Centered>
        <Formik onSubmit={handleSubmit} initialValues={signInValues}>
          {({ handleBlur, handleChange, handleSubmit, touched }) => (
            <>
              <Form.Horizontal>
                <Form.Title>Entrar</Form.Title>

                <Form.Group>
                  <Form.Control
                    id="email"
                    onBlur={handleBlur("email")}
                    onChange={handleChange("email")}
                  />
                  <Form.Label
                    htmlFor="email"
                    filled={signInValues.email !== undefined ? true : false}
                  >
                    Email
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Control />
                  <Form.Label
                    htmlFor="email"
                    filled={signInValues.password !== undefined ? true : false}
                  >
                    Senha
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Submit>Enviar</Form.Submit>
                </Form.Group>
              </Form.Horizontal>
            </>
          )}
        </Formik>
      </Centered>
    </>
  );
};

export default Login;
