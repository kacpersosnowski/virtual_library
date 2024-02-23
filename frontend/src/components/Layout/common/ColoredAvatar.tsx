import { Avatar, SxProps, Theme, Tooltip } from "@mui/material";

const stringToColor = (string: string) => {
  let hash = 0;
  let i: number;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

type Props = {
  baseName: string;
  tooltipTitle?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
};

const ColoredAvatar: React.FC<Props> = (props) => {
  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...props.sx,
      },
      children: name[0],
    };
  };

  return (
    <Tooltip title={props.tooltipTitle} arrow onClick={props.onClick}>
      <Avatar {...stringAvatar(props.baseName)} />
    </Tooltip>
  );
};

export default ColoredAvatar;
