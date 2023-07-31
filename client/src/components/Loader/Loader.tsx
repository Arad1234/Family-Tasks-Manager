import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  height: string;
}
const Loader = ({ height }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <CircularProgress size={70} />
    </Box>
  );
};

export default Loader;
