import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchForm from "../Forms/common/SearchForm";
import ChangeLanguageForm from "../Forms/common/ChangeLanguageForm/ChangeLanguageForm";
import { useTranslation } from "react-i18next";
import mainPageMessages from "../../messages/mainPageMessages";

const drawerWidth = 240; // in pixels

const MainNavbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    t(mainPageMessages.buttonsLogin.key),
    t(mainPageMessages.buttonsRegister.key),
  ];

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Liber Mundi
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ChangeLanguageForm onClickLanguage={() => setMobileOpen(false)} />
      <Box sx={{ display: "block", flexGrow: 1 }} />
    </Box>
  );

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
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <AutoStoriesIcon sx={{ display: "flex", mr: 1.3 }} />
          <Typography
            variant="h6"
            component="div"
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button sx={{ color: "#fff", mr: ".5rem" }}>{navItems[0]}</Button>
            <Button sx={{ color: "#fff", bgcolor: "primary.dark" }}>
              {navItems[1]}
            </Button>
          </Box>
          <ChangeLanguageForm
            sx={{ ml: "1rem", display: { xs: "none", md: "block" } }}
          />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};
export default MainNavbar;
