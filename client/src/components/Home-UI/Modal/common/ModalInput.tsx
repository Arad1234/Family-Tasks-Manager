import { Box, TextField, Typography } from "@mui/material";
import { InputChangeEvent } from "../../../../types";
import { useAppDispatch } from "../../../../redux/hooks";

interface Props {
  type: string;
  setChange: (payload: string | number) => {
    type: string;
    payload: string | number;
  };
  label: string;
}

const ModalInput = ({ type, setChange, label }: Props) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (e: InputChangeEvent) => {
    const { value, valueAsNumber } = e.target;
    const inputValue = type === "number" ? valueAsNumber : value;
    dispatch(setChange(inputValue));
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>{label}</Typography>
      <TextField
        onChange={handleInputChange}
        sx={{ width: "100%" }}
        required
        label="Required"
        type={type}
      />
    </Box>
  );
};

export default ModalInput;
