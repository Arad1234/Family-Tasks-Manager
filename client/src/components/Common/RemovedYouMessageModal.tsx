import { Typography } from "@mui/material";
import ModalComponent from "./Modal/ModalComponent";

const RemovedYouMessageModal = () => {
  return (
    <ModalComponent>
      <Typography>You have been removed by admin from this room</Typography>
    </ModalComponent>
  );
};

export default RemovedYouMessageModal;
