import { Box } from "@mui/material";
import { setRoomPassword } from "../../../../redux/slices/Rooms/joinRoom-slice";
import ModalInput from "../../../Modal-Common/ModalInput";
import { useAppSelector } from "../../../../redux/hooks";

const ModalInputs = () => {
  const { roomPassword } = useAppSelector((state) => state.joinRoomReducer);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomPassword}
        label="Room Password"
        isRequired={true}
        disabled={false}
        value={roomPassword}
      />
    </Box>
  );
};

export default ModalInputs;
