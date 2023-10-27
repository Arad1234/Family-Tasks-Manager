import { Box, keyframes } from "@mui/material";
import { useMemo } from "react";
import variables from "@Sass/variables.module.scss";
import BurgerMenuOption from "./BurgerMenuOption";
import { setMemberForDelete } from "@Redux/slices/FamilyRoom/members-slice";
import { setOpenModal } from "@Redux/slices/Modal/modal-slice";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import {
  CREATE_ROOM_MODAL,
  LEAVE_ROOM_MODAL,
  SIGN_OUT_MODAL,
} from "@Utils/constants/modalStatusConstants";

const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authReducer.userId);
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );

  const isRoomCreator = familyRoom?.creator.userId === userId;

  const handleOpenLeaveRoomModal = () => {
    dispatch(setMemberForDelete(userId));
    dispatch(setOpenModal(LEAVE_ROOM_MODAL));
  };

  const handleOpenSignOutModal = () => {
    dispatch(setOpenModal(SIGN_OUT_MODAL));
  };

  const handleOpenCreateRoomModal = () => {
    dispatch(setOpenModal(CREATE_ROOM_MODAL));
  };

  const burgerMenuStyle = useMemo(() => {
    const sildeMenu = keyframes`
    from {
      width: 0px
    }
    to {
      width: 100vw
    }
  `;

    return {
      width: "100vw",
      height: "100vh",
      position: "fixed",
      backgroundColor: variables.secondaryColor,
      zIndex: "1",
      right: "0",
      animation: `${sildeMenu} 0.8s`,
    };
  }, []);

  return (
    <Box sx={burgerMenuStyle}>
      <Box
        sx={{
          margin: "80px 0px 0px 30px",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "30px",
        }}
      >
        {familyRoom ? (
          isRoomCreator ? (
            <BurgerMenuOption
              color={"red"}
              onClick={() => console.log("fill!")}
            >
              Delete Room
            </BurgerMenuOption>
          ) : (
            <BurgerMenuOption onClick={handleOpenLeaveRoomModal}>
              Leave Room
            </BurgerMenuOption>
          )
        ) : (
          <BurgerMenuOption onClick={handleOpenCreateRoomModal}>
            New Room
          </BurgerMenuOption>
        )}

        <BurgerMenuOption onClick={() => console.log("fill!")}>
          Profile
        </BurgerMenuOption>
        <BurgerMenuOption onClick={handleOpenSignOutModal}>
          Sign Out
        </BurgerMenuOption>
      </Box>
    </Box>
  );
};

export default BurgerMenu;
