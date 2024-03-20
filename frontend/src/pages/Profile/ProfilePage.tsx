import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import Card from "../../components/UI/Card/Card";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import EditProfileForm from "../../components/Forms/profile/EditProfileForm";
import profileMessages from "../../messages/profileMessages";
import useFetchUserData from "../../hooks/useFetchUserData";

import booksBg from "../../assets/books-bg3.jpg";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useFetchUserData();

  if (!user) {
    return null;
  }

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        <Typography variant="h3" sx={{ mb: "1rem" }}>
          {t(profileMessages.profileHeaderTitle.key)}
        </Typography>
        <EditProfileForm user={user} />
      </Card>
    </ImageBackground>
  );
};

export default ProfilePage;
