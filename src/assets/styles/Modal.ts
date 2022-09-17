import styled from "styled-components";

const Overlay: any = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  position: fixed;
  display: ${({ isModalOpen }: any) => (isModalOpen ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.61);
`;

const Content = styled.div`
  width: 1000px;
  height: 600px;
  display: flex;
  align-items: center;
  margin: 32px auto;
  height: calc(100% - 32px * 2);
`;

const Dialog = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  color: #000;
  animation: opening 0.4s;
  background-color: #444;

  @keyframes opening {
    from {
      transform: translateY(-80px);
    }

    to {
      transform: translateY(0px);
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 60%;
    height: 100%;
  }
`;

export { Overlay, Content, Dialog, Flex };
