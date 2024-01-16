import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const DropDownBar = ({ children, className }: Props) => {
  return <Box className={className}>{children}</Box>;
};

export default DropDownBar;
