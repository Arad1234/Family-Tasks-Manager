import { Box } from "@mui/material";
import { IMember } from "../../../../types";
import { extractUserFromLocalStorage } from "../../../../utils/helpers/LocalStorage/extractUser";
import { useAppSelector } from "../../../../redux/hooks";
import AssignTaskModal from "../../Modal/AssignTaskModal/AssignTaskModal";
import AddTaskPlusIcon from "./AddTaskPlusIcon";
import TasksButton from "./TasksButton";
import MemberName from "./MemberName";

interface Props {
  member: IMember;
}

const Member = ({ member }: Props) => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { modalStatus } = useAppSelector((state) => state.modalReducer);

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();
  const isRoomCreator = currentRoom.creator.userId === currentUserId;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        border: "1px solid gray",
        borderRadius: "20px",
        padding: "15px",
      }}
    >
      <MemberName memberName={member.username} />

      <TasksButton isRoomCreator={isRoomCreator} />

      {isRoomCreator && (
        <Box sx={{ position: "absolute", left: "20rem" }}>
          <AddTaskPlusIcon />
        </Box>
      )}

      {modalStatus === "assignTask" && <AssignTaskModal member={member} />}
    </Box>
  );
};

export default Member;
