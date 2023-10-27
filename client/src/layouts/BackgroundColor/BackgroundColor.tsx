import useInitializeSocketListeners from "@Hooks/useInitializeSocketListeners";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BackgroundColor = ({ children, className }: Props) => {
  useInitializeSocketListeners();

  return <Box className={className}>{children}</Box>;
};

export default BackgroundColor;
