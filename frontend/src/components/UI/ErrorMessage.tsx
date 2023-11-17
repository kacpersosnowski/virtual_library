import { Alert, Box, SxProps, Theme } from "@mui/material";

type Props = {
  message: string;
  alertStyle?: SxProps<Theme>;
};

const ErrorMessage: React.FC<Props> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: "1rem",
      }}
    >
      <Alert severity="error" sx={props.alertStyle}>
        {props.message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
