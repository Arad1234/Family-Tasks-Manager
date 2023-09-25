import { AiOutlineCaretDown } from "react-icons/ai";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ExitIcon from "./ExitIcon";
import MenuModal from "./MenuModal";
import variables from "../../../sass/variables.module.scss";

interface Props {
  children: React.ReactNode;
  setOption: React.Dispatch<React.SetStateAction<"tasks" | "members">>;
}

const RoomHeader = ({ children, setOption }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        backgroundColor: variables.secondaryColor,
        boxShadow: "3",
        color: "white",
      }}
    >
      <ExitIcon setOption={setOption} />

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
