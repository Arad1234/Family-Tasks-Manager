import { Box } from "@mui/material";
import React, { useState } from "react";
import RoomsMenuModal from "./RoomsMenuModal";
import variables from "../../../sass/variables.module.scss";
import { getMemberRoomsSocket } from "../../../socket/FamilyRoom/EventEmitters";
import { useAppSelector } from "../../../redux/hooks";
import RoomName from "./RoomName";
import BurgerIcon from "../../BurgerMenu/BurgerIcon";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";

const RoomHeader = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.authReducer.userId);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    getMemberRoomsSocket(userId);
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      component={"nav"}
      sx={{
        position: "relative",
        backgroundColor: variables.secondaryColor,
        boxShadow: "3",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <RoomName handleOpenMenu={handleOpenMenu} />

      <BurgerIcon
        showBurgerMenu={showBurgerMenu}
        setShowBurgerMenu={setShowBurgerMenu}
      />

      {showBurgerMenu && <BurgerMenu />}

      <RoomsMenuModal
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  );
};

export default RoomHeader;
