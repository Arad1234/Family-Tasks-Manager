import { Box } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import ButtonOption from "./ButtonOption";
import { setMemberForTasks } from "../../../redux/slices/FamilyRoom/members-slice";

interface Props {
  setOption: React.Dispatch<React.SetStateAction<"tasks" | "members">>;
  option: "tasks" | "members";
}

const RoomOptions = ({ setOption, option }: Props) => {
  const dispatch = useAppDispatch();

  const handleTaskOption = () => {
    setOption("tasks");
    dispatch(setMemberForTasks(null)); // Setting selectedMember to null to show all members.
  };
  const handleMembersOption = () => {
    setOption("members");
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
        onClick={handleTaskOption}
        optionValue="tasks"
        selectedOption={option}
      >
        Your Tasks
      </ButtonOption>
      <ButtonOption
        onClick={handleMembersOption}
        optionValue="members"
        selectedOption={option}
      >
        Members
      </ButtonOption>
    </Box>
  );
};

export default RoomOptions;
