import { Divider, MenuItem } from "@mui/material";
import { IRoom } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { setMemberForTasks } from "../../../redux/slices/FamilyRoom/members-slice";

interface Props {
  room: IRoom;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MenuItemComponent = ({ room, setAnchorEl }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickRoom = () => {
    navigate(`/home/${room._id}`);
    setAnchorEl(null);
    dispatch(setMemberForTasks(null));
  };

  return (
    <>
      <MenuItem
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={handleClickRoom}
      >
        {room.roomName}
      </MenuItem>
      <Divider variant="middle" />
    </>
  );
};

export default MenuItemComponent;
