import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LabelComponent = ({ children }: Props) => {
  return (
    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
      {children}
    </Typography>
  );
};

export default LabelComponent;
