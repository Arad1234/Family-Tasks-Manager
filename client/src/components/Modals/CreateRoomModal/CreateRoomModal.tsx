import { createRoomThunk } from "../../../store/actions/rooms-actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setMaxMembers, setRoomName } from "../../../store/slices/create-room";
import { setIsOpen } from "../../../store/slices/modal-slice";
import { changeEvent } from "../../../types";
import "./CreateRoomModal.scss";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
const CreateRoomModal = () => {
  const { isOpen } = useAppSelector((state) => state.modalReducer);
  const { maxMembers, roomName } = useAppSelector(
    (state) => state.createRoomReducer
  );
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(setIsOpen(false))}
      className="create-room-modal"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80vw",
          bgcolor: "background.paper",
          border: "1px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            textDecoration: "underline",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          Room Creation
        </Typography>
        <div>
          <Typography sx={{ fontSize: "30px" }}>Room name</Typography>
          <TextField
            onChange={(e: changeEvent) => {
              dispatch(setRoomName(e.target.value));
            }}
            sx={{ width: "100%" }}
            required
            label="Required"
            type="text"
          />
        </div>
        <div>
          <Typography sx={{ fontSize: "30px" }}>Maximum members</Typography>
          <TextField
            onChange={(e: changeEvent) =>
              dispatch(setMaxMembers(e.target.value))
            }
            sx={{ width: "100%" }}
            required
            label="Required"
            type="number"
          />
        </div>

        <Button
          onClick={() => dispatch(createRoomThunk({ roomName, maxMembers }))}
          sx={{ fontSize: "30px", fontFamily: "system-ui" }}
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateRoomModal;
