import { Typography } from "@mui/material";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteGoogleCalendarEvent } from "../../../../supabase/Api";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useSession } from "@supabase/auth-helpers-react";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import { setHideModal } from "../../../../redux/slices/Modal/modal-slice";

const DeleteEventModal = () => {
  const eventToDelete = useAppSelector(
    (state) => state.calendarEventsReducer.eventToDelete
  );
  const dispatch = useAppDispatch();
  const session = useSession();

  const handleDeleteEventFromCalendar = () => {
    if (eventToDelete && session) {
      deleteGoogleCalendarEvent(eventToDelete.id, session, dispatch);
    }
  };

  const handleCancel = () => {
    dispatch(setHideModal());
  };

  return (
    <ModalComponent>
      <Typography>
        Are you sure to want to delete the event from Google Calendar?
      </Typography>
      <YesOrNoModalButtons
        width="6rem"
        handleOperation={handleDeleteEventFromCalendar}
        handleCancel={handleCancel}
        buttonOption="Delete"
      />
    </ModalComponent>
  );
};

export default DeleteEventModal;
