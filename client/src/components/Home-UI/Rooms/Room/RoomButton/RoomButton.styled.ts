import styled from "styled-components";
import RoomButton from "./RoomButton";
import variables from "@Sass/variables.module.scss";

const RoomButtonStyled = styled(RoomButton)<{ width: string }>`
  width: ${(props) => props.width};
  border-radius: 20px;
  background: ${variables.actionColor};
  height: 40px;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background: ${variables.actionColor};
  }
`;

export default RoomButtonStyled;
