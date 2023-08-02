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
    <Box sx={{ padding: "10px" }}>
      <TextField
        onChange={handleSearchInputChange}
        placeholder="Search room..."
        value={searchQuery}
        type="text"
        inputProps={{
          style: { fontSize: "20px", padding: "12px" },
        }}
      />
    </Box>
  );
};

export default SearchInput;
