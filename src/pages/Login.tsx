import { Formik } from "formik";
import { useState, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ValidationError } from "yup";

import api from "../services/api";
import Form from "../assets/styles/Form";
import Icon from "../assets/styles/Icon";
import { Centered } from "../assets/styles/Layout";
import authSchemaValidate from "../assets/schema/authSchemaValidate";
import { AuthContext } from "../hooks/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser }: any = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const loginData = {
    email: "",
    password: "",
    stayConnected: false,
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      await authSchemaValidate.signIn(data);

      const response = await api.signIn(data);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/boards");
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
        return;
      }

      toast.error(`${error.response.data}`);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (user.token) {
      navigate("/boards");
    }
  }, [user]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Centered>
        <Formik initialValues={loginData} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form.Horizontal>
              <Form.Group>
                <Form.Title>Login</Form.Title>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <Icon.Email />
                </Form.Label>

                <Form.Control
                  type="text"
                  autoComplete="email"
                  onChange={handleChange("email")}
                  value={values.email}
                  placeholder="Email"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <Icon.Lock />
                </Form.Label>

                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange("password")}
                  value={values.password}
                  placeholder="Password"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <Form.Flex>
                  <div>
                    <input
                      type="checkbox"
                      onChange={handleChange("stayConnected")}
                      checked={values.stayConnected}
                      disabled={loading}
                      id="remember"
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Form.ForgotPassword to="/recover-password">
                    Forgot your password?
                  </Form.ForgotPassword>
                </Form.Flex>
              </Form.Group>

              <Form.Group>
                <Form.Submit type="submit">Login</Form.Submit>
              </Form.Group>

              <Form.Group>
                <hr />
              </Form.Group>

              <Form.Group>
                <Form.SignUp to="/signup">Sign up for an account</Form.SignUp>
              </Form.Group>

              <Form.Group>
                <Form.ButtonGoogle>
                  <Icon.Google />
                  Sign up with Google
                </Form.ButtonGoogle>
              </Form.Group>
            </Form.Horizontal>
          )}
        </Formik>
      </Centered>
    </>
  );
};

export default Login;
