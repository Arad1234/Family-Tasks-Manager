import { MdClear } from "react-icons/md";

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ClearInputIcon = ({ setSearchQuery }: Props) => {
  return (
    <MdClear
      size={30}
      color="rgb(200, 200, 200)"
      onClick={() => setSearchQuery("")}
      onMouseDown={(e: MouseEvent) => e.preventDefault()}
      style={{ marginLeft: "15px" }}
    />
  );
};

export default ClearInputIcon;
