import { Box, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LabelComponent = ({ children }: Props) => (
  <Box sx={{ display: "flex", justifyContent: "left", width: "17rem" }}>
    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
      {children}
    </Typography>
  </Box>
);

export default LabelComponent;
