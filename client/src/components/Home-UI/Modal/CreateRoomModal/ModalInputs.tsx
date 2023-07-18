import { Box } from "@mui/material";
import {
  setMaxMembers,
  setPassword,
  setRoomName,
} from "../../../../redux/slices/Room/create-room";
import ModalInput from "../common/ModalInput";

const ModalInputs = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomName}
        label="Room name"
      />
      <ModalInput
        type="number"
        setChange={setMaxMembers}
        label="Maximum members"
      />
      <ModalInput
        type="password"
        setChange={setPassword}
        label="Room Password"
      />
    </Box>
  );
};

export default ModalInputs;
