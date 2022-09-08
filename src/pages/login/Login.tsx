import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ValidationError } from "yup";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

import authSchemaValidate from "../../assets/schema/authSchemaValidate";
import { Centered } from "../../assets/styles/Layout";
import Form from "../../assets/styles/Form";
import api from "../../services/api";
import { AuthContext } from "../../hooks/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await authSchemaValidate.signIn(data);

      const response = await api.signIn({
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/boards");
      }
    } catch (error: any) {
      console.clear();
      if (error instanceof ValidationError) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
        theme="colored"
      />
      <Centered>
        <Formik onSubmit={handleSubmit} initialValues={signInValues}>
          {({ handleChange, values }) => (
            <>
              <Form.Horizontal>
                <Form.Title>Login</Form.Title>

                <Form.Group>
                  <Form.Control
                    id="email"
                    autoComplete="username"
                    onChange={handleChange("email")}
                    value={values.email}
                    disabled={loading}
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
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange("password")}
                    value={values.password}
                    disabled={loading}
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
                    <input id="connected" type="checkbox" disabled={loading} />
                    <label htmlFor="connected">Stay connected</label>
                  </Form.Checkbox>
                </Form.Group>

                <Form.Group>
                  <Form.Submit type="submit" disabled={loading}>
                    {loading ? (
                      <TailSpin
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    ) : (
                      "Login"
                    )}
                  </Form.Submit>
                </Form.Group>

                <Form.FlexGroup>
                  <Form.Action to="/recover-password" align={"end"}>
                    Recover password
                  </Form.Action>

                  <hr />

                  <Form.Action to="/register" align={"start"}>
                    Create an account
                  </Form.Action>
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
