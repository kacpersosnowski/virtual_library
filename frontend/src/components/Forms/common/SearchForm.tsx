import { Box, SxProps, TextField, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import mainPageMessages from "../../../messages/mainPageMessages";

type Props = {
  containerSx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
};

const SearchForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        pb: "15px",
        mr: { xs: "0", md: "2rem" },
        ...props.containerSx,
      }}
    >
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        color="info"
        id="search-input"
        label={t(mainPageMessages.searchPlaceholder.key)}
        variant="standard"
        sx={{ width: { xs: "12.5rem" }, ...props.inputSx }}
      />
    </Box>
  );
};

export default SearchForm;
