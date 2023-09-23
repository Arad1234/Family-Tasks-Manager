import { Box, Typography, keyframes } from "@mui/material";
import variables from "../../../sass/variables.module.scss";

const RegisterTitle = () => {
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
      <Typography
        sx={{
          fontSize: "25px",
          padding: "0 ",
          textAlign: "center",
          fontWeight: "500",
          color: "white",
        }}
      >
        Welcome To The
        <Typography
          sx={{
            display: "block",
            fontSize: "29px",
            fontWeight: "600",
          }}
          component={"span"}
        >
          Family Tasks Manager
        </Typography>
      </Typography>
    </Box>
  );
};

export default RegisterTitle;
