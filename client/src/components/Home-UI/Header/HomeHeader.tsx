import { Box } from "@mui/material";
import NewRoomButton from "../Buttons/NewRoomButton";
import SignOut from "../Buttons/SignOut";
import variables from "../../../sass/variables.module.scss";

const HomeHeader = () => {
  return (
    <Box
      sx={{
        padding: "10px 20px 10px 20px",
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "0px 0px 35px 35px",
        alignItems: "center",
        background: variables.secondaryColor,
      }}
    >
      <NewRoomButton />
      <SignOut />
    </Box>
  );
};

export default HomeHeader;
