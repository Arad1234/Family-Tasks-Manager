import { TextField } from "@mui/material";
import { ChangeEvent } from "../../types";

interface Props {
  type: string;
  name: string;
  handleChange: (e: ChangeEvent) => void;
}

const TextInput = ({ type, name, handleChange }: Props) => {
  return (
    <TextField
      onChange={handleChange}
      type={type}
      name={name}
      inputProps={{ style: { fontSize: "20px" } }}
    />
  );
};

export default TextInput;
