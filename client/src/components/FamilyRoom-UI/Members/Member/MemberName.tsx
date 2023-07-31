import { Typography } from "@mui/material";

interface Props {
  memberName: string;
}

const MemberName = ({ memberName }: Props) => {
  return (
    <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
      {memberName}
    </Typography>
  );
};

export default MemberName;
