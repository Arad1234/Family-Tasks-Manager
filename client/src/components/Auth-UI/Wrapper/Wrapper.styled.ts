import styled from "styled-components";
import Wrapper from "./Wrapper";

export const FormWrapperStyled = styled(Wrapper)<{
  height: string;
  gap: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: ${(props) => (props.height ? props.height : "100vh")};
  gap: ${(props) => (props.gap ? props.gap : "auto")};
`;
