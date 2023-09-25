import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addTaskSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import { IMember, IRoom } from "../../../../types";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalInputs from "./ModalInputs";

const AssignTaskModal = () => {
  const { memberForAssignTask } = useAppSelector(
    (state) => state.membersReducer
  );
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { name, description, startTime, endTime } = useAppSelector(
    (state) => state.createTaskReducer
  );

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    if ((startTime && endTime) || (!startTime && !endTime)) {
      addTaskSocket(dispatch, {
        memberId: (memberForAssignTask as IMember).userId,
        roomId: (currentRoom as IRoom)._id,
        name,
        description,
        startTime,
        endTime,
      });
    } else if (startTime) {
      alert("End time must be provided!");
    }
  };

  return (
    <ModalComponent>
      <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
        Task for{" "}
        <Typography
          component={"span"}
          sx={{ fontSize: "20px", fontWeight: "600" }}
        >
          {memberForAssignTask?.username}
        </Typography>
      </Typography>
      <ModalInputs />
      <ModalButton onClick={handleAddTask}>Add Task</ModalButton>
    </ModalComponent>
  );
};

export default AssignTaskModal;
