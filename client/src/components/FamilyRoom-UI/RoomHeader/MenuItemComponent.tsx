import { Divider, MenuItem } from "@mui/material";
import { IRoom } from "../../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  room: IRoom;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MenuItemComponent = ({ room, setAnchorEl }: Props) => {
  const navigate = useNavigate();

  const handleClickRoom = () => {
    navigate(`/home/${room._id}`);
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          wordWrap: "break-word",
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={handleClickRoom}
      >
        {room.roomName}
      </MenuItem>
      <Divider
        variant="middle"
        sx={{ borderColor: "gray" }}
      />
    </>
  );
};

export default MenuItemComponent;
