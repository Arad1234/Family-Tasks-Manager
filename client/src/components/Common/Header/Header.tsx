import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HeaderComponent = ({ children, className }: Props) => {
  return (
    <Box
      component={"nav"}
      className={className}
    >
      {children}
    </Box>
  );
};

export default HeaderComponent;
