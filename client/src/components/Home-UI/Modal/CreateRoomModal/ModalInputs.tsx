import { Box, TextField, Typography } from "@mui/material";
import {
  setMaxMembers,
  setRoomName,
} from "../../../../redux/slices/Room/create-room";
import { InputChangeEvent } from "../../../../types/index";
import { useAppDispatch } from "../../../../redux/hooks";

const ModalInputs = () => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>Room name</Typography>
        <TextField
          onChange={(e: InputChangeEvent) => {
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
          onChange={(e: InputChangeEvent) =>
            dispatch(setMaxMembers(e.target.valueAsNumber))
          }
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
