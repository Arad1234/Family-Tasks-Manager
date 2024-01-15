import { Box, TextField } from "@mui/material";
import ClearInputIcon from "./ClearInputIcon";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@Redux/hooks";
import { InputChangeEvent } from "@Types/index";
import useDebounce from "@Hooks/useDebounce";
import { getRoomsByName } from "@Redux/actions/rooms-actions";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const initalizeRef = useRef(false);
  const dispatch = useAppDispatch();

  const handleSearchInputChange = (e: InputChangeEvent) => {
    setSearchQuery(e.target.value);
  };

  const debounceValue = useDebounce<string>(searchQuery);

  useEffect(() => {
    if (!initalizeRef.current) {
      initalizeRef.current = true;
    } else {
      dispatch(getRoomsByName(debounceValue));
    }
  }, [debounceValue]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <TextField
        onChange={handleSearchInputChange}
        placeholder="Search room..."
        value={searchQuery}
        sx={{
          width: "80%",
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
            boxShadow: "none",
          },
        }}
        InputProps={{
          style: {
            fontSize: "17px",

            color: "white",
            borderRadius: "20px",
            border: "1px solid white",
          },
          startAdornment: (
            <AiOutlineSearch
              size={40}
              style={{ paddingRight: "10px" }}
            />
          ),
          endAdornment: searchQuery.length > 0 && (
            <ClearInputIcon setSearchQuery={setSearchQuery} />
          ),
        }}
      />
    </Box>
  );
};

export default SearchInput;
