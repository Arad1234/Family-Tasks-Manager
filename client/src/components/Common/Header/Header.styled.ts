import styled from "styled-components";
import HeaderComponent from "./Header";
import variables from "@Sass/variables.module.scss";

const HeaderComponentStyled = styled(HeaderComponent)`
  position: relative;
  background-color: ${variables.secondaryColor};
  box-shadow: 3;
  color: white;
  display: flex;
  justify-content: center;
  min-height: 65px;
`;

export default HeaderComponentStyled;
