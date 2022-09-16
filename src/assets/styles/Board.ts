import styled from "styled-components";

const Container = styled.section`
  padding: 36px 48px;
`;

const Horizontal = styled.div`
  padding: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 12px;
  background-color: #444;
`;

const Item: any = styled.div`
  width: 250px;
  height: 150px;
  transition: 0.2s;
  margin: 0 16px 0 0;
  position: relative;
  border-radius: 10px;
  color: #fff;
  background-color: ${({ itemCreate }: any) =>
    itemCreate ? "#b39ddb" : "#333"};

  &:hover {
    background-color: ${({ itemCreate }: any) =>
      itemCreate ? "#9457fda4" : "#555"};
  }

  h2 {
    bottom: 0;
    padding: 16px;
    font-weight: 500;
    font-size: 1.2rem;
    position: absolute;
    margin: 0 16px 0 0;
  }
`;

const Background = styled.div``;

export default { Container, Horizontal, Background, Item };
