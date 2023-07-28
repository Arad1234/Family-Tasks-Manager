import { Menu, MenuList } from "@mui/material";
import { extractRoomsFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractRooms";
import { IRoom } from "../../../types";
import { extractUserFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractUser";
import { useEffect, useState } from "react";
import MenuItemComponent from "./MenuItemComponent";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MenuModal = ({ anchorEl, setAnchorEl }: Props) => {
  const [userRooms, setUserRooms] = useState<IRoom[]>([]);

  const rooms: IRoom[] = extractRoomsFromLocalStorage();
  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  useEffect(() => {
    // Getting only the rooms that the current user joined.
    const filteredUserRooms = rooms.filter((room) => {
      const filteredMembers = room.familyMembers.filter((member) => {
        return member.userId === currentUserId;
      });
      return filteredMembers.length > 0;
    });
    setUserRooms(filteredUserRooms);
  }, []);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuList sx={{ width: "358px" }}>
        {userRooms.map((room) => {
          return (
            <MenuItemComponent
              key={room._id}
              room={room}
              setAnchorEl={setAnchorEl}
            />
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default MenuModal;
