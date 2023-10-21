import { Box, TextField, keyframes } from "@mui/material";
import ClearInputIcon from "./ClearInputIcon";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@Redux/hooks";
import { InputChangeEvent } from "@Types/index";
import useDebounce from "@Hooks/useDebounce";
import { getRoomsByName } from "@Redux/actions/rooms-actions";

interface Props {
  setIsShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchInput = ({ setIsShowSearchBar }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const initialMountRef = useRef(true);

  const handleSearchInputChange = (e: InputChangeEvent) => {
    setSearchQuery(e.target.value);
  };

  const debounceValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
    } else {
      dispatch(getRoomsByName(searchQuery));
    }
  }, [debounceValue]);

  const handleInputBlur = () => {
    setIsShowSearchBar(false);
    setSearchQuery("");
  };

  const sildeSearchBar = keyframes`
  from {
    width: 0
  }
  to {
    width: 80%
  }
`;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "20px",
        width: "100%",
      }}
    >
      <TextField
        autoFocus={true}
        onBlur={handleInputBlur}
        onChange={handleSearchInputChange}
        placeholder="Search room..."
        value={searchQuery}
        type="text"
        variant="standard"
        sx={{ animation: `${sildeSearchBar} 0.5s`, width: "80%" }}
        InputProps={{
          style: {
            fontSize: "20px",
            color: "white",
            borderBottom: "2px solid white",
          },
          disableUnderline: true,
          endAdornment:
            searchQuery.length > 0 ? (
              <ClearInputIcon setSearchQuery={setSearchQuery} />
            ) : null,
        }}
      />
    </Box>
  );
};

export default SearchInput;
