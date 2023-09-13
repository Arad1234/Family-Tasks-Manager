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
      variant="standard"
      inputProps={{
        style: {
          fontSize: "18px",
          width: "15rem",
          borderBottom: "1px solid white",
          color: "white"
        },
      }}
    />
  );
};

export default InputComponent;
