import React, { ReactNode } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, IconButton, Paper, Popover } from "@mui/material";

type Props = {
  children: ReactNode;
};

export default function FilterIcon({ children }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <FilterAltIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box component={Paper} p={1}>
          {children}
        </Box>
      </Popover>
    </>
  );
}
