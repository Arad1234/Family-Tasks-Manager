import { Box, TextField, keyframes } from "@mui/material";
import { InputChangeEvent } from "../../../../types";
import ClearInputIcon from "./ClearInputIcon";

interface Props {
  setIsShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const SearchInput = ({
  setIsShowSearchBar,
  setSearchQuery,
  searchQuery,
}: Props) => {
  const handleSearchInputChange = (e: InputChangeEvent) => {
    setSearchQuery(e.target.value);
  };

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
