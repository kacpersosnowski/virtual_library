import { Box, Divider } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

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
      label: t(adminMessages.addBookTab.key),
      value: "add-book",
      icon: <BookmarkAddIcon />,
      iconPosition: "start" as const,
    },
  ];

  const [activeTab, setActiveTab] = useState(adminTabs[0].value);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/admin/", "");
    for (const tab of adminTabs) {
      if (path === tab.value) {
        setActiveTab(tab.value);
        return;
      }
    }
  }, []);

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, marginTop: "2rem" }}>
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
