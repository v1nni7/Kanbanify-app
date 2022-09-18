import styled from "styled-components";

const Container = styled.section`
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
};
