import { Box, Tooltip } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useTranslation } from "react-i18next";

import PageSlider from "./PageSlider";
import ZoomSlider from "./ZoomSlider";
import booksMessages from "../../../../messages/booksMessages";

type Props = {
  currentPage: number;
  totalPages: number;
  onTurnPage: (newPage: number) => void;
  onHandleFullScreen: () => void;
};

const ReadToolbar: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const { currentPage, totalPages, onTurnPage, onHandleFullScreen } = props;

  let visiblePages: string = "";

  if (currentPage === 0) {
    visiblePages = currentPage + 1 + "";
  } else if (currentPage === totalPages - 1) {
    visiblePages = totalPages + "";
  } else {
    visiblePages = `${currentPage + 1} - ${currentPage + 2}`;
  }

  return (
    <Box
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        borderRadius: "5px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "0 15px 15px 15px",
        mt: "2rem",
      }}
    >
      <PageSlider
        currentPage={currentPage}
        totalPages={totalPages}
        onTurnPage={onTurnPage}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {visiblePages} / {totalPages}
        </Box>
        <ZoomSlider />
        {!document.fullscreenElement ? (
          <Tooltip
            title={t(booksMessages.enterFullscreen.key)}
            arrow
            placement="top"
          >
            <FullscreenIcon
              sx={{ cursor: "pointer" }}
              onClick={onHandleFullScreen}
            />
          </Tooltip>
        ) : (
          <Tooltip
            title={t(booksMessages.exitFullscreen.key)}
            arrow
            placement="top"
          >
            <FullscreenExitIcon
              sx={{ cursor: "pointer" }}
              onClick={onHandleFullScreen}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ReadToolbar;
