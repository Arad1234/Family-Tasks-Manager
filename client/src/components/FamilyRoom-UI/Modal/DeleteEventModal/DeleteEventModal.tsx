import { Typography } from "@mui/material";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteGoogleCalendarEvent } from "../../../../Supabase/Api";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Session, useSession } from "@supabase/auth-helpers-react";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";

const DeleteEventModal = () => {
  const { eventToDelete } = useAppSelector(
    (state) => state.calendarEventsReducer
  );
  const dispatch = useAppDispatch();
  const session = useSession();

  const handleDeleteEventFromCalendar = () => {
    deleteGoogleCalendarEvent(eventToDelete.id, session as Session, dispatch);
  };
  const handleCancel = () => {
    dispatch(setShowModal({ isOpen: false, modalStatus: "" }));
  };
  return (
    <ModalComponent>
      <Typography>
        Are you sure to want to delete the event from Google Calendar?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleDeleteEventFromCalendar}
        handleCancel={handleCancel}
      />
    </ModalComponent>
  );
};

export default DeleteEventModal;
