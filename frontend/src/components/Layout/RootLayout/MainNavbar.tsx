import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../../assets/logo.png";
import SearchForm from "../../Forms/common/SearchForm";
import ChangeLanguageForm from "../../Forms/common/ChangeLanguageForm/ChangeLanguageForm";
import mainPageMessages from "../../../messages/mainPageMessages";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import Profile from "../../Profile/Profile";
import SidebarDrawer from "./SidebarDrawer";

const MainNavbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();
  const { isAuthenticated } = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    { text: t(mainPageMessages.buttonsLogin.key), link: "/login" },
    { text: t(mainPageMessages.buttonsRegister.key), link: "/register" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="clear-link">
            <Box
              component="img"
              src={logo}
              width="auto"
              height={50}
              style={{ marginRight: "10px" }}
            />
          </Link>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              display: "block",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            Liber Mundi
          </Typography>
          <Box sx={{ display: "block", flexGrow: 1 }} />
          <SearchForm />
          {!isAuthenticated && (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link to={navItems[0].link} className="clear-link">
                <Button sx={{ color: "#fff", mr: ".5rem" }}>
                  {navItems[0].text}
                </Button>
              </Link>
              <Link to={navItems[1].link} className="clear-link">
                <Button sx={{ color: "#fff", bgcolor: "primary.dark" }}>
                  {navItems[1].text}
                </Button>
              </Link>
            </Box>
          )}
          {isAuthenticated && <Profile variant="navbar" />}
          <ChangeLanguageForm
            sx={{ ml: "1rem", display: { xs: "none", md: "block" } }}
          />
        </Toolbar>
      </AppBar>
      <SidebarDrawer
        isOpen={mobileOpen}
        toggleHandler={handleDrawerToggle}
        navItems={navItems}
      />
    </Box>
  );
};
export default MainNavbar;
