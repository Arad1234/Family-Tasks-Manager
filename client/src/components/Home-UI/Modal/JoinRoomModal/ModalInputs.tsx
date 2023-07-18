import { Box } from "@mui/material";
import { setRoomPassword } from "../../../../redux/slices/Room/join-room";
import ModalInput from "../common/ModalInput";

const ModalInputs = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomPassword}
        label="Room Password"
      />
    </Box>
  );
};

export default ModalInputs;
