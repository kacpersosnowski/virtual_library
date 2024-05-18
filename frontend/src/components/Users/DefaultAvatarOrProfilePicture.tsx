import { Box, SxProps, Theme } from "@mui/material";
import { UserData } from "../../config/api/users/users.types";
import ColoredAvatar from "../Layout/common/ColoredAvatar";
import { BACKEND_BASE_URL } from "../../constants/api";

type Props = {
  user: UserData;
  avatarSx?: SxProps<Theme>;
  profilePictureSx?: SxProps<Theme>;
};

const DefaultAvatarOrProfilePicture: React.FC<Props> = (props) => {
  if (props.user.profilePictureId) {
    return (
      <Box
        component="img"
        src={`${BACKEND_BASE_URL}/files/image/${props.user.profilePictureId}`}
        alt={props.user.username}
        sx={{ ...props.profilePictureSx }}
        style={{ objectFit: "fill" }}
      />
    );
  }

  return (
    <ColoredAvatar
      baseName={props.user.username.toUpperCase()}
      sx={{ ...props.avatarSx }}
    />
  );
};

export default DefaultAvatarOrProfilePicture;
