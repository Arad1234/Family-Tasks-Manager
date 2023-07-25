import { Box } from "@mui/material";
import {
  setMaxMembers,
  setPassword,
  setRoomName,
} from "../../../../redux/slices/Rooms/create-room";
import ModalInput from "../../../Modal-Common/ModalInput";

const ModalInputs = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomName}
        label="Room name"
        isRequired={true}
      />
      <ModalInput
        type="number"
        setChange={setMaxMembers}
        label="Maximum members"
        isRequired={true}
      />
      <ModalInput
        type="password"
        setChange={setPassword}
        label="Room Password"
        isRequired={true}
      />
    </Box>
  );
};

export default ModalInputs;
