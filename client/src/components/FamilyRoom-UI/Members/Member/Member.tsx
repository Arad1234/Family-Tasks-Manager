import { Box, Button, Typography } from "@mui/material";
import { IMember } from "../../../../types";
import { extractUserFromLocalStorage } from "../../../../utils/LocalStorage/extractUser";
import { useAppSelector } from "../../../../redux/hooks";
import AssignTaskModal from "../../Modal/AssignTaskModal/AssignTaskModal";
import { useState } from "react";
import AddTaskPlusIcon from "./AddTaskIcon";

interface Props {
  member: IMember;
}

const Member = ({ member }: Props) => {
  const [clickedUserId, setClickedUserId] = useState<string>("");
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
      <Typography sx={{ fontWeight: "600" }}>{member.username}</Typography>
      <Box
        sx={{ position: "absolute", left: isRoomCreator ? "13rem" : "17.5rem" }}
      >
        <Button variant="contained">Tasks</Button>
      </Box>
      <Box sx={{ position: "absolute", left: "20rem" }}>
        {isRoomCreator && (
          <AddTaskPlusIcon
            memberId={member.userId}
            setClickedUserId={setClickedUserId}
          />
        )}
      </Box>

      {modalStatus === "assignTask" && clickedUserId && (
        <AssignTaskModal clickedUserId={clickedUserId} />
      )}
    </Box>
  );
};

export default Member;
