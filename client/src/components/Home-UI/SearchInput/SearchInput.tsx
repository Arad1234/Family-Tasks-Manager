import { Box, TextField } from "@mui/material";
import { InputChangeEvent } from "../../../types";

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const SearchInput = ({ setSearchQuery, searchQuery }: Props) => {
  const handleSearchInputChange = (e: InputChangeEvent) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ padding: "15px", display: "flex", justifyContent: "center" }}>
      <TextField
        onChange={handleSearchInputChange}
        placeholder="Search room..."
        value={searchQuery}
        type="text"
        variant="standard"
        color="info"
        InputProps={{
          sx: {
            width: "80vw",
            fontSize: "20px",
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
