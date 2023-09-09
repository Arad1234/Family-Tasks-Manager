import { Box } from "@mui/material";
import {
  setMaxMembers,
  setPassword,
  setRoomName,
} from "../../../../redux/slices/Rooms/createRoom-slice";
import ModalInput from "../../../Modal-Common/ModalInput";
import { useAppSelector } from "../../../../redux/hooks";

const ModalInputs = () => {
  const { maxMembers, roomName, roomPassword } = useAppSelector(
    (state) => state.createRoomReducer
  );
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomName}
        label="Room name"
        isRequired={true}
        disabled={false}
        value={roomName}
      />
      <ModalInput
        type="number"
        setChange={setMaxMembers}
        label="Maximum members"
        isRequired={true}
        disabled={false}
        value={maxMembers}
      />
      <ModalInput
        type="password"
        setChange={setPassword}
        label="Room Password"
        isRequired={true}
        disabled={false}
        value={roomPassword}
      />
    </Box>
  );
};

export default ModalInputs;
