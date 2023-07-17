import { Box } from "@mui/material";
import { ChildrenProps } from "../../types";
import backgroundPhoto from "../../assets/rain.jpg";

const BackgroundImage = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundImage;
