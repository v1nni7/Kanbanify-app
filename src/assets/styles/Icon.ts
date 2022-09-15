import styled from "styled-components";
import { BiLock, BiLockOpen, BiEnvelope, BiUser } from "react-icons/bi";
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

export default { Lock, Email, Google, User, LockOpen };
