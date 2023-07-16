import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LabelWrapper = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left", width: "17rem" }}>
      {children}
    </Box>
  );
};

export default LabelWrapper;
