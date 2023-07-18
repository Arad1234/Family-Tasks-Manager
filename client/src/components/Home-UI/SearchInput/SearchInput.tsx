import { TextField } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { InputChangeEvent } from "../../../types";
import { setSearchRooms } from "../../../redux/slices/Room/rooms-slice";

const SearchInput = () => {
  const disptach = useAppDispatch();

  const handleSearchInputChange = (e: InputChangeEvent) => {
    disptach(setSearchRooms(e.target.value));
  };
  return (
    <TextField
      onChange={handleSearchInputChange}
      placeholder="Search room..."
    />
  );
};

export default SearchInput;
