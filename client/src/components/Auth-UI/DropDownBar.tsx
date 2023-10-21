import { Box, keyframes } from "@mui/material";
import variables from "@Sass/variables.module.scss";
import { ChildrenProps } from "@Types/index";

const DropDownBar = ({ children }: ChildrenProps) => {
  const dropDown = keyframes`
  from {
    height: 0px
  }
  to {
    height: 110px
  }
`;

  return (
    <Box
      sx={{
        backgroundColor: variables.secondaryColor,
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "110px",
        borderRadius: "0px 0px 40px 40px",
        animation: `${dropDown} 0.8s`,
      }}
    >
      {children}
    </Box>
  );
};

export default DropDownBar;
