import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainNavbar from "./MainNavbar";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import MessageSnackbar from "../../UI/MessageSnackbar";
import { RootState } from "../../../store/redux";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";

const RootLayout = () => {
  const { isSnackbarVisible, message } = useSelector(
    (state: RootState) => state.snackbar,
  );
  const dispatch = useDispatch();

  const hideSnackbar = () => {
    dispatch(snackbarActions.hide());
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box sx={{ paddingBottom: "5rem" }}>
        <MainNavbar />
        <MessageSnackbar
          message={message}
          open={isSnackbarVisible}
          onClose={hideSnackbar}
        />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default RootLayout;
