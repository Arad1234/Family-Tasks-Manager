import { Box } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setOption } from "../../../redux/slices/RoomOptions/roomOptions-slice";
import ButtonOption from "./ButtonOption";

const RoomOptions = () => {
  const dispatch = useAppDispatch();

  const handleTaskOption = () => {
    dispatch(setOption("tasks"));
  };
  const handleCalenderOption = () => {
    dispatch(setOption("calender"));
  };
  const handleMembersOption = () => {
    dispatch(setOption("members"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
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
        handleClick={handleCalenderOption}
        optionValue="calender"
      >
        Calender
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
