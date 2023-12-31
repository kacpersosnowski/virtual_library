import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";

import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import { LANGUAGES } from "../../../../constants/languages";
import { usersApi } from "../../../../config/api/users/users";
import { AuthContext } from "../../../../store/AuthContext/AuthContext";

import classes from "./ChangeLanguageForm.module.css";

type Props = {
  sx?: SxProps;
  onClickLanguage?: () => void;
};

const ChangeLanguageForm: React.FC<Props> = (props) => {
  const { i18n } = useTranslation();
  const { mutate: changeLanguage } = useMutation({
    mutationFn: usersApi.changeUserLanguage,
  });
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem("language")) {
      i18n.changeLanguage(localStorage.getItem("language"));
    }
  }, [isAuthenticated]);

  const onChangeLanguage = (e: SelectChangeEvent<string>) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);

    if (isAuthenticated) {
      for (const language of LANGUAGES) {
        if (language.code === langCode) {
          changeLanguage(language.backendCode);
        }
      }
    }
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
      >
        {LANGUAGES.map((language) => {
          return (
            <MenuItem
              key={language.code}
              value={language.code}
              onClick={props?.onClickLanguage}
              classes={{ selected: classes.selected }}
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
