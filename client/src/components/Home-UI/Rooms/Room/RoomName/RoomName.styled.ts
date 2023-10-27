import styled from "styled-components";
import RoomName from "./RoomName";

const RoomNameStyled = styled(RoomName)`
  font-size: 30px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 320px;
  font-weight: 600;
`;

export default RoomNameStyled;
