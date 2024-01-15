import { Box } from "@mui/material";
import WelcomeTitle from "./WelcomeTitle/WelcomeTitle";
import RoomOptions from "./RoomOptions/RoomOptions";

interface Props {
  setOption: React.Dispatch<React.SetStateAction<"tasks" | "members">>;
  option: "tasks" | "members";
}

const SubHeader = ({ setOption, option }: Props) => {
  return (
    <Box
      sx={{
        boxShadow: "0px 15px 20px -20px",
      }}
    >
      <WelcomeTitle />
      <RoomOptions
        option={option}
        setOption={setOption}
      />
    </Box>
  );
};

export default SubHeader;
