import { TextField } from "@mui/material";
import { formikPropsType } from "../../types";

interface Props {
  type: string;
  name: string;
  formik: formikPropsType;
  value: string;
}
const InputComponent = ({ type, name, formik, value }: Props) => {
  const { handleChange, handleBlur } = formik;

  return (
    <TextField
      onChange={handleChange}
      type={type}
      name={name}
      value={value}
      onBlur={handleBlur}
      variant="standard"
      inputProps={{
        style: {
          fontSize: "18px",
          width: "15rem",
          borderBottom: "1px solid white",
          color: "white",
        },
      }}
    />
  );
};

export default InputComponent;
