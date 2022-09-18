import styled from "styled-components";

const Container = styled.section`
  display: flex;
  padding: 36px;
`;

const ColumnContainer = styled.div`
  display: flex;
`;

const ColumnHeight = styled.div`
  height: 84vh;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  margin: 0 18px 0 0;
  border-radius: 10px;
  background-color: #3a3a3a;
`;

const Title = styled.div`
  display: flex;
  padding: 12px;
  font-size: 1.2rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;

const TaskList = styled.div`
  flex-grow: 1;
`;

const Content = styled.div`
  color: #fff;
  overflow: hidden;
  padding: 16px 8px;
  border-radius: 10px;
  background-color: #757575;
`;

const Item = styled.div`
  padding: 6px;
`;

const ItemTitle = styled.div`
  width: 100%;
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: space-between;
`;

const ItemFlex = styled.div`
  display: flex;
`;

const Checkbox: any = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ccc;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;

  svg {
    display: ${({ isChecked }: any) => (isChecked ? "block" : "none")};
  }
`;

const Create: any = styled.div`
  padding: 8px;
  max-height: ${({ createTask }: any) => createTask ? "100%" : "56px"};
  border-radius: 10px;
  background-color: #3a3a3a;
  

  form {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    border-radius: 10px;
    padding: ${({ createTask }: any) => createTask ? "4px" : "0px"};
    background-color: ${({ createTask }: any) => createTask ? "#757575" : "#3a3a3a"};

    input {
      width: 200px;
      height: 25px;
      border: none;
      height: 40px;
      color: #fff;
      outline: none;
      margin: 0 6px 0 0;
      font-size: 1.2rem;
      padding: 0 0 0 8px;
      border-radius: 10px;
      transition: 0.2s;
      border: 2px #3a3a3a solid;
      background-color: transparent;
      border-color: ${({ createTask }: any) => createTask ? "transparent" : "#3a3a3a"};

      &:focus {
        border: 2px #ccc solid;
      }
    }

    button[type="submit"] {
      display: flex;
      border: none;
      color: #fff;
      padding: 0;
      padding: 5px;
      font-size: 1rem;
      border-radius: 8px;
      background-color: #7e57c2;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #673ab7;
      }

      svg {
        font-size: 1.8rem;
      }
    }
  }
`;

export default {
  Container,
  ColumnContainer,
  ColumnHeight,
  Column,
  Title,
  TaskList,
  Item,
  Content,
  ItemTitle,
  ItemFlex,
  Checkbox,
  Create,
};
