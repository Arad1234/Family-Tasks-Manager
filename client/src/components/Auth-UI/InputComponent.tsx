import { TextField } from "@mui/material";
import { InputChangeEvent } from "../../types";

interface Props {
  type: string;
  name: string;
  handleChange: (e: InputChangeEvent) => void;
}
const InputComponent = ({ handleChange, type, name }: Props) => {
  return (
    <TextField
      onChange={handleChange}
      type={type}
      name={name}
      inputProps={{
        style: { fontSize: "18px", padding: "10px", width: "14rem" },
      }}
    />
  );
};

export default InputComponent;
