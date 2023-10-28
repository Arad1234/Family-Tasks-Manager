import { Menu, MenuList } from "@mui/material";
import MenuItemComponent from "./MenuItemComponent";
import { useAppSelector } from "../../../redux/hooks";
import variables from "@Sass/variables.module.scss";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const RoomsMenuModal = ({ anchorEl, setAnchorEl }: Props) => {
  const open = Boolean(anchorEl);
  const currentUserRooms = useAppSelector(
    (state) => state.familyRoomReducer.currentUserRooms
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      MenuListProps={{ style: { padding: "0" } }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuList
        sx={{
          width: "358px",
          backgroundColor: variables.secondaryColor,
        }}
      >
        {currentUserRooms.map((room) => {
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

export default RoomsMenuModal;
