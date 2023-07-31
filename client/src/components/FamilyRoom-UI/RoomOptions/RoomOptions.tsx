import { Box } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setOption } from "../../../redux/slices/FamilyRoom/roomOptions-slice";
import ButtonOption from "./ButtonOption";
import { setSelectedMember } from "../../../redux/slices/FamilyRoom/members-slice";

const RoomOptions = () => {
  const dispatch = useAppDispatch();

  const handleTaskOption = () => {
    dispatch(setOption("tasks"));
    dispatch(setSelectedMember(null)); // Setting selectedMember to null to show all members.
  };
  const handleMembersOption = () => {
    dispatch(setOption("members"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
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
