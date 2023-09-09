import { Box, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LabelComponent = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left", width: "14.9rem" }}>
      <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>
        {children}
      </Typography>
    </Box>
  );
};

export default LabelComponent;
