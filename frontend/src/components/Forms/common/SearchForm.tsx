import { Box, SxProps, TextField, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import mainPageMessages from "../../../messages/mainPageMessages";

type Props = {
  id: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (text: string) => void;
  containerSx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  placeholder?: string;
};

const SearchForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && props.onEnter) {
      props.onEnter((event.target as HTMLInputElement).value);
    }
  };

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
        id={props.id}
        label={props.placeholder || t(mainPageMessages.searchPlaceholder.key)}
        variant="standard"
        sx={{ width: { xs: "12.5rem" }, ...props.inputSx }}
        value={props.value || ""}
        onChange={props.onChange}
        onKeyUp={handleKeyPress}
      />
    </Box>
  );
};

export default SearchForm;
