import { Box } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setRoomOption } from "../../../redux/slices/FamilyRoom/roomOptions-slice";
import ButtonOption from "./ButtonOption";
import { setSelectedMember } from "../../../redux/slices/FamilyRoom/members-slice";

const RoomOptions = () => {
  const dispatch = useAppDispatch();

  const handleTaskOption = () => {
    dispatch(setRoomOption("tasks"));
    dispatch(setSelectedMember(null)); // Setting selectedMember to null to show all members.
  };
  const handleMembersOption = () => {
    dispatch(setRoomOption("members"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "55px",
        padding: "15px 0px 15px 0px",
      }}
    >
      <ButtonOption
        handleClick={handleTaskOption}
        optionValue="tasks"
      >
        Your Tasks
      </ButtonOption>
      <ButtonOption
        handleClick={handleMembersOption}
        optionValue="members"
      >
        Members
      </ButtonOption>
    </Box>
  );
};

export default RoomOptions;
