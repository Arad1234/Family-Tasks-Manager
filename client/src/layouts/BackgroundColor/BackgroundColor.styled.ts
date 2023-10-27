import styled from "styled-components";
import variables from "@Sass/variables.module.scss";
import BackgroundColor from "./BackgroundColor";

 const BackgroundColorStyled = styled(BackgroundColor)`
  background: ${variables.primaryColor};
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: auto;
`;

export default BackgroundColorStyled
