import {
  Box,
  Divider,
  Grid,
  Card as MuiCard,
  CardContent,
  Typography,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";

import Card from "../../components/UI/Card/Card";
import booksBg from "../../assets/books-bg2.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import ScrollableTabs from "../../components/Layout/common/ScrollableTabs";
import adminMessages from "../../messages/adminMessages";
import ActionButton from "../../components/UI/ActionButton";
import { STATISTICS_URL } from "../../constants/api";
import { useQuery } from "react-query";
import { commonApi } from "../../config/api/common/common";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";

const AdminPanel = () => {
  const { t } = useTranslation();
  const {
    data: statistics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => commonApi.getStatistics(),
  });
  const adminTabs = [
    {
      label: t(adminMessages.homeTab.key),
      value: "",
      icon: <HomeIcon />,
      iconPosition: "start" as const,
    },
    {
      label: t(adminMessages.booksTab.key),
      value: "books",
      icon: <MenuBookIcon />,
      iconPosition: "start" as const,
    },
    {
      label: t(adminMessages.authorsTab.key),
      value: "authors",
      icon: <GroupIcon />,
      iconPosition: "start" as const,
    },
    {
      label: t(adminMessages.genresTab.key),
      value: "genres",
      icon: <CategoryIcon />,
      iconPosition: "start" as const,
    },
  ];

  const [activeTab, setActiveTab] = useState(adminTabs[0].value);
  const location = useLocation();

  const path = location.pathname.replace("/admin/", "");

  useEffect(() => {
    if (path === "") {
      setActiveTab(adminTabs[0].value);
      return;
    }
    for (const tab of adminTabs) {
      const regex = new RegExp(`^${tab.value}(/|$)`);
      if (path !== "" && regex.test(path)) {
        setActiveTab(tab.value);
        return;
      }
    }
  }, [path]);

  const isRootAdminPath = location.pathname === "/admin";

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" } }}>
        <ScrollableTabs
          activeTabValue={activeTab}
          setActiveTabValue={setActiveTab}
          tabs={adminTabs}
        />
        <Divider />
        {isRootAdminPath && (
          <>
            {isError && (
              <ErrorMessage
                message={t(errorMessages.somethingWentWrongError.key)}
              />
            )}
            {!isError && isLoading && <LoadingSpinner />}
            {!isLoading && !isError && (
              <Box
                sx={{
                  width: "100%",
                  minHeight: "65vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ my: "1.5rem" }}>
                  {t(adminMessages.welcomeHeader.key)}
                </Typography>
                <Grid container spacing={3} sx={{ marginBottom: 3 }}>
                  <Grid item xs={12} sm={6} md={4}>
                    <MuiCard>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MenuBookIcon
                          fontSize="large"
                          sx={{ marginBottom: 1 }}
                        />
                        <Typography variant="h6">
                          {t(adminMessages.statisticsBooks.key)}
                        </Typography>
                        <Typography variant="h4">
                          {statistics.booksCount}
                        </Typography>
                      </CardContent>
                    </MuiCard>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <MuiCard>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <GroupIcon fontSize="large" sx={{ marginBottom: 1 }} />
                        <Typography variant="h6">
                          {t(adminMessages.statisticsAuthors.key)}
                        </Typography>
                        <Typography variant="h4">
                          {statistics.authorsCount}
                        </Typography>
                      </CardContent>
                    </MuiCard>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <MuiCard>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CategoryIcon
                          fontSize="large"
                          sx={{ marginBottom: 1 }}
                        />
                        <Typography variant="h6">
                          {t(adminMessages.statisticsGenres.key)}
                        </Typography>
                        <Typography variant="h4">
                          {statistics.genresCount}
                        </Typography>
                      </CardContent>
                    </MuiCard>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: 2,
                  }}
                >
                  <ActionButton
                    variant="contained"
                    startIcon={<BarChartIcon />}
                    sx={{ marginBottom: 2 }}
                  >
                    <Box
                      component="a"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                      href={STATISTICS_URL}
                    >
                      {t(adminMessages.externalStatisticsButton.key)}
                    </Box>
                  </ActionButton>
                </Box>
              </Box>
            )}
          </>
        )}
        {!isRootAdminPath && (
          <Box
            sx={{
              width: "100%",
              minHeight: "65vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Outlet />
          </Box>
        )}
      </Card>
    </ImageBackground>
  );
};

export default AdminPanel;
