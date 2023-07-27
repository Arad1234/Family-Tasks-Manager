import { Box, TextField, Typography } from "@mui/material";
import { InputChangeEvent } from "../../types";
import { useAppDispatch } from "../../redux/hooks";

interface Props {
  type: string;
  setChange: (payload: string | number | Date | null) => {
    type: string;
    payload: string | number;
  };
  label: string;
  isRequired: boolean;
}

const ModalInput = ({ type, setChange, label, isRequired }: Props) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (e: InputChangeEvent) => {
    const { value, valueAsNumber, valueAsDate } = e.target;
    let inputValue = null;
    if (type === "number") {
      inputValue = valueAsNumber;
    } else if (type === "date") {
      console.log("ARADARAD");
      inputValue = valueAsDate;
    } else {
      inputValue = value;
    }

    dispatch(setChange(inputValue));
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>{label}</Typography>
      <TextField
        onChange={handleInputChange}
        sx={{ width: "100%" }}
        required={isRequired}
        label={isRequired ? "Required" : ""}
        type={type}
      />
    </Box>
  );
};

export default ModalInput;
