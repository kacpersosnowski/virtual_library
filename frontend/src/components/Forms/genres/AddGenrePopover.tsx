import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import adminMessages from "../../../messages/adminMessages";
import { Genre } from "../../../config/api/genres/genres.types";
import AddGenreForm from "./AddEditGenreForm";

type Props = {
  addChosenGenre?: (genre: Genre) => void;
};

const AddGenrePopover: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "add-genre-popover" : undefined;

  return (
    <Box>
      <Tooltip
        title={t(adminMessages.addGenreFormSubmitButton.key)}
        arrow
        placement="top"
      >
        <IconButton
          aria-describedby={id}
          sx={{ ml: "0.5rem" }}
          onClick={handleClick}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AddGenreForm
          sx={{ py: "1rem" }}
          closePopover={handleClose}
          addChosenGenre={props.addChosenGenre}
          isPopover
        />
      </Popover>
    </Box>
  );
};

export default AddGenrePopover;
