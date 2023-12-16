import { Alert, AlertColor, Snackbar } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
};

const MessageSnackbar: React.FC<Props> = (props) => {
  return (
    <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
      <Alert
        onClose={props.onClose}
        severity={props.severity || "success"}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default MessageSnackbar;
