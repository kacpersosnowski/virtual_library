import { Box, Divider } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import Card from "../../components/UI/Card/Card";
import booksBg from "../../assets/books-bg2.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import ScrollableTabs from "../../components/Layout/common/ScrollableTabs";
import adminMessages from "../../messages/adminMessages";

const AdminPanel = () => {
  const { t } = useTranslation();
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
      icon: <BookIcon />,
      iconPosition: "start" as const,
    },
    {
      label: t(adminMessages.authorsTab.key),
      value: "authors",
      icon: <PersonIcon />,
      iconPosition: "start" as const,
    },
    {
      label: t(adminMessages.genresTab.key),
      value: "genres",
      icon: <LibraryBooksIcon />,
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

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" } }}>
        <ScrollableTabs
          activeTabValue={activeTab}
          setActiveTabValue={setActiveTab}
          tabs={adminTabs}
        />
        <Divider />
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
      </Card>
    </ImageBackground>
  );
};

export default AdminPanel;
