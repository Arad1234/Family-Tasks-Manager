import { Box, TextField, Typography } from "@mui/material";
import {
  setMaxMembers,
  setRoomName,
} from "../../../store/slices/Room/create-room";
import { ChangeEvent } from "../../../types/index";
import { useAppDispatch } from "../../../store/hooks";

const ModalInputs = () => {
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>Room name</Typography>
        <TextField
          onChange={(e: ChangeEvent) => {
            dispatch(setRoomName(e.target.value));
          }}
          sx={{ width: "100%" }}
          required
          label="Required"
          type="text"
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>Maximum members</Typography>
        <TextField
          onChange={(e: ChangeEvent) => dispatch(setMaxMembers(e.target.value))}
          sx={{ width: "100%" }}
          required
          label="Required"
          type="number"
        />
      </Box>
    </Box>
  );
};

export default ModalInputs;
