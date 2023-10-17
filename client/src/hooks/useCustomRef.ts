import { useRef } from "react";

const useCustomRef = (data: any) => {
  const ctx = useRef(data);
  ctx.current = data;
  return ctx;
};

export default useCustomRef;
