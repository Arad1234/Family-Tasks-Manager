import { Box } from "@mui/material";
import ModalInput from "../../../Modal-Common/ModalInput";
import {
  setTaskDescription,
  setTaskName,
  setTaskTime,
} from "../../../../redux/slices/FamilyRoom/createTask-slice";

const ModalInputs = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setTaskName}
        label="Task name"
        isRequired={true}
      />
      <ModalInput
        type="text"
        setChange={setTaskDescription}
        label="Description"
        isRequired={false}
      />
      <ModalInput
        type="datetime-local"
        setChange={setTaskTime}
        label="Time to do"
        isRequired={false}
      />
    </Box>
  );
};

export default ModalInputs;
