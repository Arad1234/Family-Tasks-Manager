import { Box } from "@mui/material";
import React, { useState } from "react";
import RoomsMenuModal from "./RoomsMenuModal";
import variables from "../../../sass/variables.module.scss";
import { getMemberRoomsSocket } from "../../../socket/FamilyRoom/EventEmitters";
import { useAppSelector } from "../../../redux/hooks";
import RoomName from "./RoomName";
import BurgerIcon from "../../BurgerMenu/BurgerIcon";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RoomHeader = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.authReducer.userId);
  const navigate = useNavigate();

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
      <IoMdArrowBack
        style={{ position: "absolute", left: "10px", top: "15px" }}
        size={35}
        onClick={() => navigate("/home")}
      />

      <RoomName anchorEl={anchorEl} handleOpenMenu={handleOpenMenu} />

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
