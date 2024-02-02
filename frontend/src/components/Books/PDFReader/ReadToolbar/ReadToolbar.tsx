import { Box } from "@mui/material";

import PageSlider from "./PageSlider";

type Props = {
  currentPage: number;
  totalPages: number;
  onTurnPage: (newPage: number) => void;
};

const ReadToolbar: React.FC<Props> = (props) => {
  const { currentPage, totalPages, onTurnPage } = props;

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
      </Box>
    </Box>
  );
};

export default ReadToolbar;
