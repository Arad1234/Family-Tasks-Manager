import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  setIsShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchIcon = ({ setIsShowSearchBar }: Props) => {
  return (
    <AiOutlineSearch
      size={35}
      style={{ position: "absolute", left: "12px", top: "15px" }}
      onClick={() => setIsShowSearchBar(true)}
    />
  );
};

export default SearchIcon;
