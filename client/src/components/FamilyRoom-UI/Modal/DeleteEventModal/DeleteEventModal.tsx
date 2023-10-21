import { Typography } from "@mui/material";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { useSession } from "@supabase/auth-helpers-react";
import YesOrNoModalButtons from "../../../Modal-Common/YesOrNoModalButtons";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { deleteGoogleCalendarEvent } from "@Supabase/Api";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";

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
