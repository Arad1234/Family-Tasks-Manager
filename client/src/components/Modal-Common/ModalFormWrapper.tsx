import { ChildrenProps } from "../../types";

const ModalFormWrapper = ({
  children,
  onSubmit,
}: ChildrenProps & { onSubmit: (values: any) => void }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      {children}
    </form>
  );
};

export default ModalFormWrapper;
