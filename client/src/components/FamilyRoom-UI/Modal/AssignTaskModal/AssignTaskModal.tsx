import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addTaskSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import { IMember } from "../../../../types";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalInputs from "./ModalInputs";

interface Props {
  member: IMember;
}

const AssignTaskModal = ({ member }: Props) => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { name, description, startTime, endTime } = useAppSelector(
    (state) => state.createTaskReducer
  );

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    if ((startTime && endTime) || (!startTime && !endTime)) {
      addTaskSocket(dispatch, {
        memberId: member.userId,
        roomId: currentRoom._id,
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
      <ModalTitle>Assign Task to {member.username}</ModalTitle>
      <ModalInputs />
      <ModalButton handleClick={handleAddTask}>Add Task</ModalButton>
    </ModalComponent>
  );
};

export default AssignTaskModal;
