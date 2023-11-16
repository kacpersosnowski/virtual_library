import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginY: "3rem" }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
