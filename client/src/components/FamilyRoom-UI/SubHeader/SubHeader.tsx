import { Box } from "@mui/material";
import WelcomeTitle from "./WelcomeTitle/WelcomeTitle";
import RoomOptions from "./RoomOptions/RoomOptions";
import variables from "../../../sass/variables.module.scss";

interface Props {
  setOption: React.Dispatch<React.SetStateAction<"tasks" | "members">>;
  option: "tasks" | "members";
}

const SubHeader = ({ setOption, option }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: variables.secondaryColor,
        boxShadow: "0px 2px 2px 0px black",
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
