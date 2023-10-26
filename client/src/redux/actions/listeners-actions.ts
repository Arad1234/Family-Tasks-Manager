import { ICommonListeners, IErrorListeners } from "@Types/index";
import {
  INITIALIZE_COMMON_LISTENERS,
  INITIALIZE_CONNECTION_LISENERS,
  INITIALIZE_ERROR_LISTENERS,
} from "@Utils/constants/actionTypeConstants";

export const initializeConnectionListeners = () => {
  return {
    type: INITIALIZE_CONNECTION_LISENERS,
  };
};

export const initializeCommonListeners = ({
  navigate,
  location,
}: ICommonListeners) => {
  return {
    type: INITIALIZE_COMMON_LISTENERS,
    payload: { navigate, location },
  };
};

export const initializeErrorListeners = ({ navigate }: IErrorListeners) => {
  return {
    type: INITIALIZE_ERROR_LISTENERS,
    payload: { navigate },
  };
};
