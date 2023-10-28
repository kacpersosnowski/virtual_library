import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        pb: "15px",
        mr: { xs: "0", md: "2rem" },
      }}
    >
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        color="info"
        id="search-input"
        label="Search"
        variant="standard"
      />
    </Box>
  );
};

export default SearchForm;
