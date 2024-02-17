import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import AddEditAuthorForm from "./AddEditAuthorForm";
import { Author } from "../../../config/api/authors/authors.types";
import adminMessages from "../../../messages/adminMessages";

type Props = {
  addChosenAuthor?: (author: Author) => void;
};

const AddAuthorPopover: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "add-author-popover" : undefined;

  return (
    <Box>
      <Tooltip
        title={t(adminMessages.addAuthorFormSubmitButton.key)}
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
        <AddEditAuthorForm
          sx={{ py: "1rem" }}
          closePopover={handleClose}
          addChosenAuthor={props.addChosenAuthor}
          isPopover
        />
      </Popover>
    </Box>
  );
};

export default AddAuthorPopover;
