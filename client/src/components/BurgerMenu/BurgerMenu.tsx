import { Box, keyframes } from "@mui/material";
import { useMemo } from "react";
import variables from "../../sass/variables.module.scss";
import BurgerMenuOption from "./BurgerMenuOption";
import { setMemberForDelete } from "../../redux/slices/FamilyRoom/members-slice";
import { setOpenModal } from "../../redux/slices/Modal/modal-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { axiosClient } from "../../axiosClient";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const userId = useAppSelector((state) => state.authReducer.userId);

  const handleOpenLeaveRoomModal = () => {
    dispatch(setMemberForDelete(userId));
    dispatch(setOpenModal("leaveRoom"));
  };

  const handleSignOut = async () => {
    navigate("/");
    // This will trigger the auth event "SIGNED_OUT".
    await supabase.auth.signOut();
    await axiosClient.post("/user/logout");
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
        <BurgerMenuOption onClick={handleOpenLeaveRoomModal}>
          Leave Room
        </BurgerMenuOption>
        <BurgerMenuOption onClick={handleOpenLeaveRoomModal}>
          Profile
        </BurgerMenuOption>
        <BurgerMenuOption onClick={handleSignOut}>Sign Out</BurgerMenuOption>
      </Box>
    </Box>
  );
};

export default BurgerMenu;
