import { TextField } from "@mui/material";
import { InputChangeEvent } from "../../../types";

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ setSearchQuery }: Props) => {
  const handleSearchInputChange = (e: InputChangeEvent) => {
    setSearchQuery(e.target.value);
  };
  return (
    <TextField
      onChange={handleSearchInputChange}
      placeholder="Search room..."
    />
  );
};

export default SearchInput;
