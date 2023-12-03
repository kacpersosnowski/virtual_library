import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainNavbar from "./MainNavbar";
import { Box } from "@mui/material";

const RootLayout = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box sx={{ paddingBottom: "5rem" }}>
        <MainNavbar />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default RootLayout;
