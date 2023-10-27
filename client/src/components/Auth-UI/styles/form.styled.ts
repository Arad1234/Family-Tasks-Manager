import styled from "styled-components";
import variables from "@Sass/variables.module.scss";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 5px 0px rgba(100, 100, 100, 0.3);
  width: 80vw;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: ${variables.secondaryColor};
  border-radius: 20px;
`;