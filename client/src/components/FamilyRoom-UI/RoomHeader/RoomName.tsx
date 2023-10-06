import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { AiOutlineCaretDown } from "react-icons/ai";

interface Props {
  handleOpenMenu: (e: React.MouseEvent<HTMLElement>) => void;
}

const RoomName = ({ handleOpenMenu }: Props) => {
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );
  return (
    <Box
      onClick={handleOpenMenu}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        gap: "13px",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "40px" }}>
        {familyRoom?.roomName}
      </Typography>
      <AiOutlineCaretDown size={25} />
    </Box>
  );
};

export default RoomName;
