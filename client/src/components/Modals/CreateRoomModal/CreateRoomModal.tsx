import React from "react";
import "./CreateRoomModal.scss";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
const CreateRoomModal = () => {
  return (
    <Modal
      open={true}
      className="create-room-modal"
    >
      <Box
        sx={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: "background.paper",
          border: "1px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          required
          label="Required"
          placeholder="Room name"
        />
        <Button variant="contained">Hello</Button>
      </Box>
    </Modal>
  );
};

export default CreateRoomModal;
