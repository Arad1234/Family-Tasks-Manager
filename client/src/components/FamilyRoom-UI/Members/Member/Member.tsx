import { Box } from "@mui/material";
import { IRoom, IUser } from "../../../../types";
import { useAppSelector } from "../../../../redux/hooks";
import AddTaskPlusIcon from "./AddTaskPlusIcon";
import TasksButton from "./TasksButton";
import MemberName from "./MemberName";
import DeleteMemberIcon from "./DeleteMemberIcon";

interface Props {
  member: IUser;
}

const Member = ({ member }: Props) => {
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom as IRoom
  );

  const userId = useAppSelector((state) => state.authReducer.userId);

  const isRoomCreator = familyRoom.creator.userId === userId;

  // If the user is the room creator AND it is not himself (cannot delete himself).
  const canDeleteMember = isRoomCreator && member.userId !== userId;

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
