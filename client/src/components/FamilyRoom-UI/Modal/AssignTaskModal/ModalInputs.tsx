import { Box } from "@mui/material";
import ModalInput from "../../../Modal-Common/ModalInput";
import {
  setTaskDescription,
  setTaskEndTime,
  setTaskName,
  setTaskStartTime,
} from "../../../../redux/slices/FamilyRoom/createTask-slice";
import { useAppSelector } from "../../../../redux/hooks";

const ModalInputs = () => {
  const { startTime } = useAppSelector((state) => state.createTaskReducer);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setTaskName}
        label="Task name"
        isRequired={true}
        disabled={false}
      />
      <ModalInput
        type="text"
        setChange={setTaskDescription}
        label="Description"
        isRequired={false}
        disabled={false}
      />
      <ModalInput
        type="datetime-local"
        setChange={setTaskStartTime}
        label="Start Time"
        isRequired={false}
        disabled={false}
      />
      <ModalInput
        type="datetime-local"
        setChange={setTaskEndTime}
        label="End Time"
        isRequired={false}
        disabled={!Boolean(startTime)}
      />
    </Box>
  );
};

export default ModalInputs;
