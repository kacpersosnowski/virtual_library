import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../constants/languages";

type Props = {
  sx?: SxProps;
  onClickLanguage?: () => void;
};

const ChangeLanguageForm: React.FC<Props> = (props) => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (e: SelectChangeEvent<string>) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
  };

  return (
    <FormControl sx={props?.sx}>
      <Select
        id="select-language"
        value={i18n.language}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
        onChange={onChangeLanguage}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              backgroundColor: "primary.dark",
            },
            "&& .Mui-selected:hover": {
              backgroundColor: "#024A72",
            },
          },
        }}
      >
        {LANGUAGES.map((language) => {
          return (
            <MenuItem
              key={language.code}
              value={language.code}
              onClick={props?.onClickLanguage}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={language.flagIcon}
                  width="30px"
                  height="30px"
                  sx={{ mr: "6px" }}
                />
                {language.label}
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChangeLanguageForm;
