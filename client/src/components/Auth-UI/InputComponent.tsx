import { TextField, TextFieldProps } from "@mui/material";
import { formikPropsType } from "../../types";

type Props = {
  formik: formikPropsType;
} & TextFieldProps;

const InputComponent = ({ formik, ...props }: Props) => {
  const { handleChange, handleBlur } = formik;

  return (
    <TextField
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      variant="standard"
      color="info"
      inputProps={{
        style: {
          fontSize: "18px",
          width: "15rem",
          borderBottom: "2px solid white",
          color: "white",
        },
      }}
    />
  );
};

export default InputComponent;
