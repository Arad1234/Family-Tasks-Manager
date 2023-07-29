import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addTaskSocket } from "../../../../socket/FamilyRoom/EventEmitters";
import ModalButton from "../../../Modal-Common/ModalButton";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalTitle from "../../../Modal-Common/ModalTitle";
import ModalInputs from "./ModalInputs";

interface Props {
  clickedUserId: string;
}

const AssignTaskModal = ({ clickedUserId }: Props) => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { name, description, startTime, endTime } = useAppSelector(
    (state) => state.createTaskReducer
  );

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    addTaskSocket(dispatch, {
      memberId: clickedUserId,
      roomId: currentRoom._id,
      name,
      description,
      startTime,
      endTime,
    });
  };

  return (
    <ModalComponent>
      <ModalTitle>Assign Task</ModalTitle>
      <ModalInputs />
      <ModalButton handleClick={handleAddTask}>Add Task</ModalButton>
    </ModalComponent>
  );
};

export default AssignTaskModal;
