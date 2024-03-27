import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import Card from "../../components/UI/Card/Card";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import EditProfileForm from "../../components/Forms/profile/EditProfileForm";
import profileMessages from "../../messages/profileMessages";
import useFetchUserData from "../../hooks/useFetchUserData";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import { usersApi } from "../../config/api/users/users";
import ChangePasswordForm from "../../components/Forms/auth/ChangePasswordForm";

import booksBg from "../../assets/books-bg3.jpg";

const ProfilePage = () => {
  const { t } = useTranslation();
  const {
    user,
    isLoading: isUserLoading,
    error: isUserError,
  } = useFetchUserData();
  const {
    data: profilePicture,
    isLoading: isProfilePictureLoading,
    isError: isProfilePictureError,
  } = useQuery({
    queryFn: usersApi.getUserProfilePicture,
    queryKey: ["users", "profilePicture"],
  });

  let content = (
    <>
      <EditProfileForm user={user} profilePictureFile={profilePicture} />
      <ChangePasswordForm />
    </>
  );

  if (isUserError || isProfilePictureError) {
    content = <ErrorMessage message={t(errorMessages.userDataError.key)} />;
  }

  if (isUserLoading || isProfilePictureLoading) {
    content = <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        <Typography variant="h3" sx={{ mb: "1rem" }}>
          {t(profileMessages.profileHeaderTitle.key)}
        </Typography>
        {content}
      </Card>
    </ImageBackground>
  );
};

export default ProfilePage;
