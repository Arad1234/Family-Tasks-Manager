import { Box } from "@mui/material";
import { IMember } from "../../../../types";
import { extractUserFromLocalStorage } from "../../../../utils/helpers/LocalStorage/extractUser";
import { useAppSelector } from "../../../../redux/hooks";
import AddTaskPlusIcon from "./AddTaskPlusIcon";
import TasksButton from "./TasksButton";
import MemberName from "./MemberName";
import DeleteMemberIcon from "./DeleteMemberIcon";

interface Props {
  member: IMember;
}

const Member = ({ member }: Props) => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  const isRoomCreator = currentRoom?.creator.userId === currentUserId;

  // If the user is the room creator AND it is not himself (cannot delete himself).
  const canDeleteMember = isRoomCreator && member.userId !== currentUserId;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "30px",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "5px",
        height: "20px",
        margin: "10px 0px 10px 0px",
        width: "80vw",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: canDeleteMember ? "space-between" : "center",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <MemberName memberName={member.username} />
        {canDeleteMember && <DeleteMemberIcon member={member} />}
      </Box>

      <Box sx={{ display: "flex", gap: "40px" }}>
        <TasksButton member={member} />
        {isRoomCreator && <AddTaskPlusIcon member={member} />}
      </Box>
    </Box>
  );
};

export default Member;
