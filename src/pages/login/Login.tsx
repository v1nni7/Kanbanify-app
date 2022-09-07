import { Formik } from "formik";
import { Centered } from "../../assets/styles/Layout";
import Form from "../../assets/styles/Form";
import signup from "../signup";
import * as Yup from "yup";
import api from "../../services/api";

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

  const handleSubmit = async (data: SignInType) => {
    try {
      // validate data
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      schema.validateSync(data);

      const response = await api.signIn(data);
      if (response.status === 200) {
      }
    } catch (error) {}
  };

  return (
    <>
      <Centered>
        <Formik onSubmit={handleSubmit} initialValues={signInValues}>
          {({ handleChange, values }) => (
            <>
              <Form.Horizontal>
                <Form.Title>Login</Form.Title>

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
                    Password
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Checkbox>
                    <input id="connected" type="checkbox" />
                    <label htmlFor="connected">Stay connected</label>
                  </Form.Checkbox>
                </Form.Group>

                <Form.Group>
                  <Form.Submit type="submit">Login</Form.Submit>
                </Form.Group>

                <Form.FlexGroup>
                  <Form.Action to="/recover-password">
                    Recover password
                  </Form.Action>

                  <hr />

                  <Form.Action to="/register">Create your account</Form.Action>
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
