import { Link } from "@mui/material";
import { ChildrenProps } from "../../types";
import variables from "../../sass/variables.module.scss";

const LinkComponent = ({
  children,
  href,
}: ChildrenProps & { href: string }) => {
  return (
    <Link
      color={variables.actionColor}
      href={href}
      underline="none"
      variant="h6"
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
