import { Box } from "@mui/material";
import { setRoomPassword } from "../../../../redux/slices/Rooms/joinRoom-slice";
import ModalInput from "../../../Modal-Common/ModalInput";

const ModalInputs = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomPassword}
        label="Room Password"
        isRequired={true}
        disabled={false}
      />
    </Box>
  );
};

export default ModalInputs;
