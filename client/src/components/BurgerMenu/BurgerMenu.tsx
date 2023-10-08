import { Box, keyframes } from "@mui/material";
import { useMemo } from "react";
import variables from "../../sass/variables.module.scss";
import BurgerMenuOption from "./BurgerMenuOption";
import { setMemberForDelete } from "../../redux/slices/FamilyRoom/members-slice";
import { setOpenModal } from "../../redux/slices/Modal/modal-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SignOutModal from "../Common/SignOutModal";

const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authReducer.userId);
  const modalStatus = useAppSelector((state) => state.modalReducer.modalStatus);
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );
  const isRoomCreator = familyRoom?.creator.userId === userId;

  const handleOpenLeaveRoomModal = () => {
    dispatch(setMemberForDelete(userId));
    dispatch(setOpenModal("leaveRoom"));
  };

  const handleOpenSignOutModal = () => {
    dispatch(setOpenModal("signOut"));
  };

  const burgerMenuStyle = useMemo(() => {
    const sildeMenu = keyframes`
    from {
      width: 0px
    }
    to {
      width: 100% 
    }
  `;

    return {
      width: "100%",
      height: "100vh",
      position: "absolute",
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
        {isRoomCreator ? (
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
        )}
        <BurgerMenuOption onClick={() => console.log("fill!")}>
          Profile
        </BurgerMenuOption>
        <BurgerMenuOption onClick={handleOpenSignOutModal}>
          Sign Out
        </BurgerMenuOption>
      </Box>

      {modalStatus === "signOut" && <SignOutModal />}
    </Box>
  );
};

export default BurgerMenu;
