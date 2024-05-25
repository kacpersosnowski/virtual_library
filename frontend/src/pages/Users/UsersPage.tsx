import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

import Card from "../../components/UI/Card/Card";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import booksBg from "../../assets/books-bg2.jpg";
import usersMessages from "../../messages/usersMessages";
import UsersTable from "../../components/Users/UsersTable";
import UsersTableHeader from "../../components/Users/UsersTableHeader";

const UsersPage = () => {
  const { t } = useTranslation();

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        <Typography variant="h3" sx={{ mb: 0 }}>
          {t(usersMessages.usersTitle.key)}
        </Typography>
        <Box
          sx={{
            width: { xs: "95%", sm: "90%", md: "80%" },
            py: "1rem",
            mr: "auto",
            ml: "auto",
          }}
        >
          <UsersTableHeader />
          <UsersTable />
        </Box>
      </Card>
    </ImageBackground>
  );
};

export default UsersPage;
