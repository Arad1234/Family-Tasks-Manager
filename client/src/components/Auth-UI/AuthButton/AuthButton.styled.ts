import styled from "styled-components";
import variables from "@Sass/variables.module.scss";
import AuthButton from "./AuthButton";

export const AuthButtonStyled = styled(AuthButton)`
  padding: 13px;
  height: 35px;
  border-radius: 5px;
  outline: none;
  margin-top: 10px;
  background-color: ${variables.actionColor};
  font-weight: 600;
  font-size: 14px;
  width: 62vw;
  text-transform: none;

  &:hover {
    background-color: ${variables.actionColor};
  }
`;
