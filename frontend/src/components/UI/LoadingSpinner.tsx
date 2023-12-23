import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

type CircularProgressColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

type Props = {
  boxSx?: SxProps<Theme>;
  color?: CircularProgressColor;
};

const LoadingSpinner: React.FC<Props> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginY: "3rem",
        ...props.boxSx,
      }}
    >
      <CircularProgress color={props.color || "primary"} />
    </Box>
  );
};

export default LoadingSpinner;
