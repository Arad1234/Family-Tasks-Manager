import { getRoomsSocket } from "@Redux/actions/rooms-actions";
import { useAppDispatch } from "@Redux/hooks";
import { useCallback } from "react";

const useCallBackRef = <T extends number>(payload: T) => {
  const dispatch = useAppDispatch();

  const callBackRef = useCallback(
    (node: HTMLDivElement | null) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry) {
            dispatch(getRoomsSocket({ page: payload, isIntersecting: true }));
          }
        },
        { threshold: 1 }
      );

      if (node !== null) {
        observer.observe(node);
      }
    },
    [payload]
  );

  return callBackRef;
};

export default useCallBackRef;
