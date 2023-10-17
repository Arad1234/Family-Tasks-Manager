import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { AiOutlineCaretDown } from "react-icons/ai";

interface Props {
  handleOpenMenu: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
}

const RoomName = ({ handleOpenMenu, anchorEl }: Props) => {
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );

  return (
    <Box
      onClick={handleOpenMenu}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "13px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "30px",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "210px",
        }}
      >
        {familyRoom?.roomName}
      </Typography>
      <AiOutlineCaretDown
        style={{
          transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s",
        }}
        size={25}
      />
    </Box>
  );
};

export default RoomName;
