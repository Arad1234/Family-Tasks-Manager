import { Box } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setOption } from "../../../redux/slices/FamilyRoom/roomOptions-slice";
import ButtonOption from "./ButtonOption";

const RoomOptions = () => {
  const dispatch = useAppDispatch();

  const handleTaskOption = () => {
    dispatch(setOption("tasks"));
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
