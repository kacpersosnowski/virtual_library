import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import { usersApi } from "../../config/api/users/users";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import DefaultAvatarOrProfilePicture from "./DefaultAvatarOrProfilePicture";
import UserBookLists from "../BookLists/UserBookLists";
import usersMessages from "../../messages/usersMessages";

const UserDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => usersApi.getUserDetails(id),
  });

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (isUserError) {
    return (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  return (
    <>
      <Typography variant="h3" sx={{ mb: "1.5rem" }}>
        {t(usersMessages.userDetailsProfileHeader.key)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "100%", md: "80%" },
          mr: "auto",
          ml: "auto",
          columnGap: 5,
          rowGap: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <DefaultAvatarOrProfilePicture
            user={user}
            avatarSx={{
              width: "14rem",
              height: "14rem",
              fontSize: "7rem",
            }}
            profilePictureSx={{
              width: "14rem",
              height: "14rem",
              borderRadius: "7rem",
            }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex" }}>
          <List>
            <ListItem>
              <ListItemText
                primary={user.username}
                secondary={t(usersMessages.userDetailsUsernamePrompt.key)}
                primaryTypographyProps={{ fontSize: "2rem" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  user.firstName || t(usersMessages.userDetailsNoData.key)
                }
                secondary={t(usersMessages.userDetailsFirstNamePrompt.key)}
                primaryTypographyProps={{ fontSize: "2rem" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  user.lastName || t(usersMessages.userDetailsNoData.key)
                }
                secondary={t(usersMessages.userDetailsLastNamePrompt.key)}
                primaryTypographyProps={{ fontSize: "2rem" }}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
      <Typography variant="h3" sx={{ my: "2rem" }}>
        {t(usersMessages.userDetailsProfileListsHeader.key)}
      </Typography>
      <UserBookLists lists={user.bookLists} readonlyMode />
    </>
  );
};

export default UserDetails;
