import { Box, FormControl, MenuItem, Select, SxProps } from "@mui/material";

import polishFlag from "../../../assets/polish-flag.png";
import englishFlag from "../../../assets/english-flag.png";

type Props = {
  sx?: SxProps;
};

const ChangeLanguageForm: React.FC<Props> = (props) => {
  return (
    <FormControl sx={props?.sx}>
      <Select
        id="select-language"
        value="pl"
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      >
        <MenuItem value="pl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={polishFlag}
              width="30px"
              height="30px"
              sx={{ mr: "6px" }}
            />
            Polski
          </Box>
        </MenuItem>
        <MenuItem value="en">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={englishFlag}
              width="30px"
              height="30px"
              sx={{ mr: "6px" }}
            />
            English
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ChangeLanguageForm;
