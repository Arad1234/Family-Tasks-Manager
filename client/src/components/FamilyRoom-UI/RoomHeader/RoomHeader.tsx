import { AiOutlineCaretDown } from "react-icons/ai";
import { Box, Typography } from "@mui/material";
import React from "react";
import ExitIcon from "./ExitIcon";

interface Props {
  children: React.ReactNode;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
}

const RoomHeader = ({ children, setAnchorEl }: Props) => {
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(50, 250, 100, 0.2)",
        boxShadow: "3",
      }}
    >
      <ExitIcon />

      <Box
        onClick={handleOpenMenu}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          gap: "13px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700 }}
        >
          {children}
        </Typography>
        <AiOutlineCaretDown size={25} />
      </Box>
    </Box>
  );
};

export default RoomHeader;
