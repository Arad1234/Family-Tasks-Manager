import { Typography } from "@mui/material";

const RegisterTitle = () => {
  return (
    <Typography
      sx={{
        fontSize: "25px",
        padding: "0 30px 0 30px",
        textAlign: "center",
        fontWeight: "500",
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
        Family Tasks Manager!
      </Typography>
    </Typography>
  );
};

export default RegisterTitle;
