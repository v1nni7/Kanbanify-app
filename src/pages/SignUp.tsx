import { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ValidationError } from "yup";

import Form from "../assets/styles/Form";
import Icon from "../assets/styles/Icon";
import { Centered } from "../assets/styles/Layout";
import authSchemaValidate from "../assets/schema/authSchemaValidate";
import { AuthContext } from "../hooks/context/AuthContext";
import userServices from "../services/userServices";

const SignUp = () => {
  const navigate = useNavigate();

  const { user }: any = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const signUpData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsConditions: false,
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      await authSchemaValidate.signUp(data);

      const response = await userServices.signUp(data);

      if (response.status === 201) {
        navigate("/login");
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

  useEffect(() => {
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
        <Formik initialValues={signUpData} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form.Horizontal>
              <Form.Group>
                <Form.Label>
                  <Icon.User />
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="username"
                  onChange={handleChange("username")}
                  value={values.username}
                  placeholder="Username"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <Icon.Email />
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="current-email"
                  onChange={handleChange("email")}
                  value={values.email}
                  placeholder="Email"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <Icon.LockOpen />
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange("password")}
                  value={values.password}
                  placeholder="Password"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <Icon.Lock />
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm password"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group>
                <input
                  type="checkbox"
                  onChange={handleChange("termsConditions")}
                  checked={values.termsConditions}
                  disabled={loading}
                  id="terms"
                />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a>
                </label>
              </Form.Group>

              <Form.Group>
                <Form.Submit type="submit">Create Account</Form.Submit>
              </Form.Group>
            </Form.Horizontal>
          )}
        </Formik>
      </Centered>
    </>
  );
};

export default SignUp;
