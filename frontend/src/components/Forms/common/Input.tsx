import {
  FormControl,
  InputLabel,
  OutlinedInput,
  SxProps,
  Theme,
} from "@mui/material";

type Props = {
  id: string;
  label: string;
  variant?: "standard" | "outlined" | "filled";
  sx?: SxProps<Theme>;
  className?: string;
};

const Input: React.FC<Props> = (props) => {
  return (
    <FormControl
      className={props.className}
      variant={props.variant || "outlined"}
      sx={props.sx || { width: "80%", mt: "0.5rem", mb: "0.5rem" }}
    >
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput id={props.id} label={props.label} />
    </FormControl>
  );
};

export default Input;
