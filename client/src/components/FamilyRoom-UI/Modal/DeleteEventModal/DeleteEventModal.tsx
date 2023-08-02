import { Typography } from "@mui/material";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import { deleteGoogleCalendarEvent } from "../../../../Supabase/Api";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useSession } from "@supabase/auth-helpers-react";
import DeleteModalButtons from "../../../Modal-Common/DeleteModalButtons";
import { hideModal } from "../../../../utils/helpers/hideModal";

const DeleteEventModal = () => {
  const { eventToDelete } = useAppSelector(
    (state) => state.calendarEventsReducer
  );
  const dispatch = useAppDispatch();
  const session = useSession();

  const handleDeleteEventFromCalendar = () => {
    if (eventToDelete && session) {
      deleteGoogleCalendarEvent(eventToDelete.id, session, dispatch);
    }
  };
  const handleCancel = () => {
    hideModal(dispatch);
  };
  return (
    <ModalComponent>
      <Typography>
        Are you sure to want to delete the event from Google Calendar?
      </Typography>
      <DeleteModalButtons
        handleDelete={handleDeleteEventFromCalendar}
        handleCancel={handleCancel}
        buttonOption="Delete"
      />
    </ModalComponent>
  );
};

export default DeleteEventModal;
