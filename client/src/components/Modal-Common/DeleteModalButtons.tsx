import { Box, Button } from "@mui/material";

interface Props {
  handleDelete: () => void;
  handleCancel: () => void;
  buttonOption: string;
}

const DeleteModalButtons = ({
  handleDelete,
  handleCancel,
  buttonOption,
}: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Button
        sx={{ width: "40%" }}
        variant="contained"
        onClick={handleDelete}
      >
        {buttonOption}
      </Button>
      <Button
        sx={{ width: "40%" }}
        variant="contained"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default DeleteModalButtons;
