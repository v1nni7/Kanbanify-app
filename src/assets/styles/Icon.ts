import styled from "styled-components";
import {
  BiLock,
  BiLockOpen,
  BiEnvelope,
  BiUser,
  BiColumns,
  BiImage,
  BiCheck,
} from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Lock = styled(BiLock)`
  color: #9e3dff;
  font-size: 1.8rem;
`;

const LockOpen = styled(BiLockOpen)`
  color: #9e3dff;
  font-size: 1.8rem;
`;

const Email = styled(BiEnvelope)`
  color: #9e3dff;
  font-size: 1.8rem;
`;

const Google = styled(FcGoogle)`
  margin: 0 8px 0 0;
`;

const User = styled(BiUser)`
  color: #9e3dff;
  font-size: 1.8rem;
`;

const Board = styled(BiColumns)`
  color: #9e3dff;
  font-size: 1.8rem;
`;

const Image = styled(BiImage)`
  color: #9e3dff;
  font-size: 1.8rem;
`;

const Check = styled(FaCheck)`
  top: -4px;
  left: 0px;
  color: #349c2f;
  font-size: 1.8rem;
  position: absolute;
`;

export default { Lock, Email, Google, User, LockOpen, Board, Image, Check };
