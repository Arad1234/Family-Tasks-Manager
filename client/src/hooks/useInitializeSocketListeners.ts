import {
  initializeCommonListeners,
  initializeConnectionListeners,
  initializeErrorListeners,
} from "@Redux/actions/listeners-actions";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useInitializeSocketListeners = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authReducer.userId);

  useEffect(() => {
    if (userId) {
      dispatch(initializeConnectionListeners());
    }
  }, [userId]);

  useEffect(() => {
    dispatch(initializeErrorListeners({ navigate }));
  }, [navigate]);

  useEffect(() => {
    dispatch(
      initializeCommonListeners({
        navigate,
        locationPath: location.pathname,
      })
    );
  }, [location.pathname, navigate]);
};

export default useInitializeSocketListeners;
