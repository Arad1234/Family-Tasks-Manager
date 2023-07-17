import { Box, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import { ChangeEvent } from "../../../../types";
import { setRoomPassword } from "../../../../redux/slices/Room/join-room";

const ModalInputs = () => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>Room Password</Typography>
        <TextField
          onChange={(e: ChangeEvent) => {
            dispatch(setRoomPassword(e.target.value));
          }}
          sx={{ width: "100%" }}
          required
          label="Required"
          type="text"
        />
      </Box>
    </Box>
  );
};

export default ModalInputs;
