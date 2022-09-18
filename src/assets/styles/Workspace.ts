import styled from "styled-components";

const Container: any = styled.section`
  padding: 36px 48px;
  display: ${({ flexDisplay }: any) => (flexDisplay ? "flex" : "block")};
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
  cursor: pointer;
  margin: 0 16px 0 0;
  position: relative;
  border-radius: 10px;
  color: #fff;
  background: ${({ image }: any) => (image ? `url(${image})` : "#b39ddb")};
  background-size: cover;
  overflow: hidden;

  &:hover {
    background: ${({ image }: any) => (image ? null : "#9457fda4")};
  }

  h2 {
    bottom: 0;
    z-index: 2;
    padding: 16px;
    font-weight: 500;
    font-size: 1.2rem;
    position: absolute;
    margin: 0 16px 0 0;
  }
`;

const Overlay = styled.div`
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 0.4s;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default { Container, Horizontal, Overlay, Item };
