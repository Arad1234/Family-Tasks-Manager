export const createNodeAndAppendToBody = (nodeId: string): HTMLDivElement => {
  const nodeElement = document.createElement("div");

  nodeElement.setAttribute("id", nodeId);

  document.body.appendChild(nodeElement);

  return nodeElement;
};
