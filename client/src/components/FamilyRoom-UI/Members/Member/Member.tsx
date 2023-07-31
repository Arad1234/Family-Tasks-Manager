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
  const isRoomCreator = currentRoom?.creator.userId === currentUserId;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "15px",
        alignItems: "center",
        boxShadow: "2px 3px 3px gray",
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "13px",
      }}
    >
      <MemberName memberName={member.username} />

      <Box sx={{ display: "flex", gap: "40px" }}>
        <TasksButton member={member} />
        {isRoomCreator && <AddTaskPlusIcon member={member} />}
      </Box>

      {modalStatus === "assignTask" && <AssignTaskModal />}
    </Box>
  );
};

export default Member;
