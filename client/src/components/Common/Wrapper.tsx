import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  height?: string;
}

const Wrapper = ({ children, height }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: height ? height : "100vh",
        width: "100vw",
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
