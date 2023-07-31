import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addTaskSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import { IMember, IRoom } from "../../../../types";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalInputs from "./ModalInputs";

const AssignTaskModal = () => {
  const { memberToAssignTask } = useAppSelector(
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
        memberId: (memberToAssignTask as IMember).userId,
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
        Assign Task to{" "}
        <Typography
          component={"span"}
          sx={{ display: "block", fontSize: "20px", fontWeight: "600" }}
        >
          {memberToAssignTask?.username}
        </Typography>
      </Typography>
      <ModalInputs />
      <ModalButton handleClick={handleAddTask}>Add Task</ModalButton>
    </ModalComponent>
  );
};

export default AssignTaskModal;
