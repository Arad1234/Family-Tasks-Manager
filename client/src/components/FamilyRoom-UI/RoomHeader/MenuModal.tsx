import { Menu, MenuItem, MenuList } from "@mui/material";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MenuModal = ({ anchorEl, setAnchorEl }: Props) => {
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
      <MenuList sx={{ width: "400px" }}>
        <MenuItem onClick={handleClose}>arad</MenuItem>
        <MenuItem onClick={handleClose}>arad</MenuItem>
        <MenuItem onClick={handleClose}>arad</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuModal;
