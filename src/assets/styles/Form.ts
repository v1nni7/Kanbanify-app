import { Form } from "formik";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Horizontal = styled(Form)`
  width: 400px;
  padding: 12px;
  border-radius: 12px;
  background-color: #444;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  text-align: center;
`;

const Group = styled.div`
  padding: 12px;
  position: relative;
`;

const Label = styled.label`
  top: 22px;
  left: 16px;
  position: absolute;
`;

const Control = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  font-size: 1.2rem;
  border-radius: 8px;
  padding: 8px 8px 8px 38px;
  font-family: "Lexend Deca", sans-serif;
`;

const Submit = styled.button`
  width: 100%;
  border: none;
  color: #fff;
  padding: 12px;
  transition: 0.2s;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #9e3dff;

  &:hover {
    background-color: #7d2bd8;
  }
`;

const SignUp = styled(Link)`
  display: block;
  padding: 12px;
  color: #9e3dff;
  border-radius: 8px;
  border: 2px #9e3dff solid;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;
  font-size: 1.2rem;

  &:hover {
    color: #b061ff;
    border-color: #b061ff;
  }
`;

const ForgotPassword = styled(Link)`
  color: #fff;
  transition: 0.2s;
  text-decoration: none;

  &:hover {
    color: #ccc;
  }
`;

const ButtonGoogle = styled.button`
  color: #444;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: none;
  padding: 12px;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    background-color: #ccc;
  }
`;

export default {
  Horizontal,
  Title,
  Group,
  Label,
  Control,
  Submit,
  ButtonGoogle,
  SignUp,
  Flex,
  ForgotPassword,
};
