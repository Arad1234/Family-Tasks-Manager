import { Typography } from "@mui/material";
import ModalComponent from "../Modal-Common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";
import { useDispatch } from "react-redux";
import YesOrNoModalButtons from "../Modal-Common/YesOrNoModalButtons";
import { socket } from "../../socket/socket";

const SignOutModal = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    navigate("/");
    socket.disconnect();
    // This will trigger the auth event "SIGNED_OUT".
    await supabase.auth.signOut();
    await axiosClient.post("/user/logout");
  };
  return (
    <ModalComponent>
      <Typography>Are you sure you want to sign out?</Typography>
      <YesOrNoModalButtons
        width="7rem"
        handleOperation={handleSignOut}
        handleCancel={() => dispatch(setHideModal())}
        buttonOption={"Sign Out"}
      />
    </ModalComponent>
  );
};

export default SignOutModal;
