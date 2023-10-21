import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  height?: string;
  gap?: string;
}

const Wrapper = ({ children, height, gap }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: height ? height : "100vh",
        gap: gap ? gap : "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
