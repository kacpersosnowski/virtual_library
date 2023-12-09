import booksBg from "../../assets/books-bg.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import ScrollableTabs from "../../components/Layout/common/ScrollableTabs";
import Card from "../../components/UI/Card/Card";
import { Box, Divider } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const AdminPanel = () => {
  const adminTabs = [
    { label: "Home", icon: <HomeIcon />, iconPosition: "start" as const },
    {
      label: "Add book",
      icon: <BookmarkAddIcon />,
      iconPosition: "start" as const,
    },
  ];

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, marginTop: "2rem" }}>
        <ScrollableTabs tabs={adminTabs} />
        <Divider />
        <Box sx={{ width: "100%", minHeight: "65vh", textAlign: "left" }}></Box>
      </Card>
    </ImageBackground>
  );
};

export default AdminPanel;
