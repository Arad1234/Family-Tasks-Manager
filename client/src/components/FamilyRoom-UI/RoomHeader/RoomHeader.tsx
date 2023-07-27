import { AiOutlineCaretDown } from "react-icons/ai";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ExitIcon from "./ExitIcon";
import MenuModal from "./MenuModal";

interface Props {
  children: React.ReactNode;
}

const RoomHeader = ({ children }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
        <Typography sx={{ fontWeight: 700, fontSize: "40px" }}>
          {children}
        </Typography>
        <AiOutlineCaretDown size={25} />
      </Box>

      <MenuModal
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  );
};

export default RoomHeader;
