import styled from "styled-components";
import { Form } from "formik";

const Horizontal = styled(Form)`
  margin: 0 auto;
  width: 400px;
  padding: 8px;
  display: block;
  border-radius: 12px;
  background-color: #444;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  padding: 8px;
`;

const Group = styled.div`
  padding: 8px;
  position: relative;
`;

const Label: any = styled.label`
  top: ${({ filled }: any) => (filled ? "24px" : "12px")};
  left: 20px;
  color: #000;
  transition: 0.1s;
  position: absolute;
`;

const Control = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  padding: 18px 12px 0;

  &:focus ~ label {
    top: 12px;
    font-size: 0.9rem;
  }
`;

const Submit = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  transition: 0.2s;
  font-size: 1.2rem;
  border-radius: 6px;
  color: #fff;
  background-color: #7e57c2;

  &:hover {
    background-color: #673ab7;
  }
`;

export default { Horizontal, Title, Group, Label, Control, Submit };
