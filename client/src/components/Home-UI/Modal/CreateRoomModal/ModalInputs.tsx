import { Box } from "@mui/material";
import {
  setMaxMembers,
  setPassword,
  setRoomName,
} from "../../../../redux/slices/Rooms/createRoom-slice";
import ModalInput from "../../../Modal-Common/ModalInput";

const ModalInputs = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setRoomName}
        label="Room name"
        isRequired={true}
        disabled={false}

      />
      <ModalInput
        type="number"
        setChange={setMaxMembers}
        label="Maximum members"
        isRequired={true}
        disabled={false}

      />
      <ModalInput
        type="password"
        setChange={setPassword}
        label="Room Password"
        isRequired={true}
        disabled={false}

      />
    </Box>
  );
};

export default ModalInputs;
