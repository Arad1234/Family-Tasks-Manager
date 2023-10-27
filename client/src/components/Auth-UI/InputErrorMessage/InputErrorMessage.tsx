import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const InputErrorMessage = ({ children, className }: Props) => {
  return <Typography className={className}>{children}</Typography>;
};

export default InputErrorMessage;
