import { Divider } from "@mui/material";

const DividerComponent = () => {
  return (
    <Divider
      variant="fullWidth"
      sx={{
        height: "1px",
        width: "10.5rem",
        color: "black",
        borderColor: "rgba(0,0,0,0.4)",
      }}
    />
  );
};

export default DividerComponent;
