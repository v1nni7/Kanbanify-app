import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

import api from "../../services/api";
import Form from "../../assets/styles/Form";
import { Centered } from "../../assets/styles/Layout";
import authSchemaValidate from "../../assets/schema/authSchemaValidate";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  interface RegisterType {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  const signUpValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termConditions: false,
  };

  const handleSubmit = async (data: RegisterType) => {
    try {
      setLoading(true);

      await authSchemaValidate.signUp(data);

      const response = await api.signUp({
        email: data.email,
        username: data.username,
        password: data.password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
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
        <Formik onSubmit={handleSubmit} initialValues={signUpValues}>
          {({ handleChange, values }) => (
            <Form.Horizontal>
              <Form.Title>Register</Form.Title>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="username"
                  value={values.username}
                  onChange={handleChange("username")}
                  disabled={loading}
                />
                <Form.Label
                  filled={values.username ? false : true}
                  htmlFor="username"
                >
                  Username
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="email"
                  autoComplete="current-email"
                  value={values.email}
                  onChange={handleChange("email")}
                  disabled={loading}
                />
                <Form.Label
                  filled={values.email ? false : true}
                  htmlFor="email"
                >
                  Email
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange("password")}
                  disabled={loading}
                />
                <Form.Label
                  filled={values.password ? false : true}
                  htmlFor="password"
                >
                  Password
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  disabled={loading}
                />
                <Form.Label
                  filled={values.confirmPassword ? false : true}
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Checkbox>
                  <input
                    id="conditions"
                    checked={values.termConditions}
                    onChange={handleChange("termConditions")}
                    type="checkbox"
                    disabled={loading}
                  />
                  <label htmlFor="conditions">
                    I agree to the terms and conditions
                  </label>
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
                    "Register"
                  )}
                </Form.Submit>
              </Form.Group>
            </Form.Horizontal>
          )}
        </Formik>
      </Centered>
    </>
  );
};

export default Register;
