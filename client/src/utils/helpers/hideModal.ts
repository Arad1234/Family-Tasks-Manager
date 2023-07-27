import { setShowModal } from "../../redux/slices/Modal/modal-slice";
import { AppDispatch } from "../../redux/store";

export const hideModal = (dispatch: AppDispatch) => {
  dispatch(setShowModal({ isOpen: false, status: "" }));
};
