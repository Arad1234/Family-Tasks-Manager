import { useRef } from "react";

const useCustomRef = <T>(data: T): { current: T } => {
  const ctx = useRef(data);
  ctx.current = data;
  return ctx;
};

export default useCustomRef;
