import { createNodeAndAppendToBody } from "@Utils/helpers/createNodeAndAppendToBody";
import { useLayoutEffect, useState } from "react";

const useCreatePortalElement = (nodeId: string): HTMLElement | null => {
  const [nodeElement, setNodeElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(nodeId)!;

    if (!element) {
      element = createNodeAndAppendToBody(nodeId);
    }

    setNodeElement(element);

    return () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [nodeId]);

  return nodeElement;
};

export default useCreatePortalElement;
