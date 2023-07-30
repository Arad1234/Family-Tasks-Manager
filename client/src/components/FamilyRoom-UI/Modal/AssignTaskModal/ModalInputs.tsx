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
  const { startTime, endTime, name, description } = useAppSelector(
    (state) => state.createTaskReducer
  );

  const isStartTime = Boolean(startTime);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ModalInput
        type="text"
        setChange={setTaskName}
        label="Task name"
        isRequired={true}
        disabled={false}
        value={name}
      />
      <ModalInput
        type="text"
        setChange={setTaskDescription}
        label="Description"
        isRequired={false}
        disabled={false}
        value={description}
      />
      <ModalInput
        type="datetime-local"
        setChange={setTaskStartTime}
        label="Start Time"
        isRequired={false}
        disabled={false}
        value={startTime}
      />
      <ModalInput
        type="datetime-local"
        setChange={setTaskEndTime}
        label="End Time"
        isRequired={false}
        disabled={!isStartTime}
        value={endTime}
      />
    </Box>
  );
};

export default ModalInputs;
