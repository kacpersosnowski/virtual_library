import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../../store/AuthContext/AuthContext";
import Profile from "../../Profile/Profile";
import ChangeLanguageForm from "../../Forms/common/ChangeLanguageForm/ChangeLanguageForm";
import mainPageMessages from "../../../messages/mainPageMessages";

type Props = {
  isOpen: boolean;
  toggleHandler: () => void;
  navItems: {
    text: string;
    link: string;
  }[];
};

const drawerWidth = 240; // in pixels

const SidebarDrawer: React.FC<Props> = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Liber Mundi
      </Typography>
      <Divider />
      <List>
        {!isAuthenticated && (
          <>
            <ListItem
              sx={{ display: { xs: "block", md: "none" } }}
              disablePadding
            >
              <ListItemButton onClick={props.toggleHandler}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link to="/login" className="clear-link">
                      {t(mainPageMessages.buttonsLogin.key)}
                    </Link>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{ display: { xs: "block", md: "none" } }}
              disablePadding
            >
              <ListItemButton onClick={props.toggleHandler}>
                <ListItemIcon>
                  <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link to="/register" className="clear-link">
                      {t(mainPageMessages.buttonsRegister.key)}
                    </Link>
                  }
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {isAuthenticated && <Profile variant="drawer" />}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin panel" />
          </ListItemButton>
        </ListItem>
      </List>
      <ChangeLanguageForm
        sx={{ display: { xs: "block", md: "none" } }}
        onClickLanguage={props.toggleHandler}
      />
      <Box sx={{ display: "block", flexGrow: 1 }} />
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={props.isOpen}
      onClose={props.toggleHandler}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: "block",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default SidebarDrawer;
