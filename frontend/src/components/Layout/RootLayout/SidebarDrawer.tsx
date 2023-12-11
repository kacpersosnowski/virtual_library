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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../../store/AuthContext/AuthContext";
import Profile from "../../Profile/Profile";
import ChangeLanguageForm from "../../Forms/common/ChangeLanguageForm/ChangeLanguageForm";
import mainPageMessages from "../../../messages/mainPageMessages";
import adminMessages from "../../../messages/adminMessages";

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
  const navigate = useNavigate();

  const clickNavItemHandler = (link: string) => {
    props.toggleHandler();
    navigate(link);
  };

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
              <ListItemButton
                onClick={clickNavItemHandler.bind(this, "/login")}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={t(mainPageMessages.buttonsLogin.key)} />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{ display: { xs: "block", md: "none" } }}
              disablePadding
            >
              <ListItemButton
                onClick={clickNavItemHandler.bind(this, "/register")}
              >
                <ListItemIcon>
                  <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t(mainPageMessages.buttonsRegister.key)}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {isAuthenticated && <Profile variant="drawer" />}
        <ListItem disablePadding>
          <ListItemButton onClick={clickNavItemHandler.bind(this, "/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t(adminMessages.sidebarAdminPanel.key)} />
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
