import useCreatePortalElement from "@Hooks/useCreatePortalElement";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  nodeId: string;
}

const ReactPortal = ({ children, nodeId }: Props) => {
  const nodeElement = useCreatePortalElement(nodeId);

  if (!nodeElement) return null;

  return createPortal(children, nodeElement);
};

export default ReactPortal;
