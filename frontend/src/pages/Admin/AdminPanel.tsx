import booksBg from "../../assets/books-bg.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import ScrollableTabs from "../../components/Layout/common/ScrollableTabs";
import Card from "../../components/UI/Card/Card";
import { Box, Divider } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const adminTabs = [
  {
    label: "Home",
    value: "",
    icon: <HomeIcon />,
    iconPosition: "start" as const,
  },
  {
    label: "Add book",
    value: "add-book",
    icon: <BookmarkAddIcon />,
    iconPosition: "start" as const,
  },
];

const AdminPanel = () => {
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
