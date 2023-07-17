import { Link } from "@mui/material";
import { ChildrenProps } from "../../types";

const LinkComponent = ({
  children,
  href,
}: ChildrenProps & { href: string }) => {
  return (
    <Link
      sx={{}}
      href={href}
      underline="none"
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
