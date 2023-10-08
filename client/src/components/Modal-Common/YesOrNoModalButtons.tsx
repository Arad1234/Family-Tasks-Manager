import { Box, Button } from "@mui/material";

interface Props {
  handleOperation: () => void;
  handleCancel: () => void;
  buttonOption: string;
  width?: string;
}

const YesOrNoModalButtons = ({
  handleOperation,
  handleCancel,
  buttonOption,
  width,
}: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Button
        sx={{ width: width ? width : "auto" }}
        variant="contained"
        onClick={handleOperation}
      >
        {buttonOption}
      </Button>
      <Button
        sx={{ width: width ? width : "auto" }}
        variant="contained"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default YesOrNoModalButtons;
