import React from "react";
import { Box } from "@mui/material";
import { Page as ReactPDFPage } from "react-pdf";

type Props = {
  number: number;
  width: number;
};

const Page = React.forwardRef<HTMLDivElement, Props>(
  function PageComponent(props, ref) {
    return (
      <Box sx={{ bgcolor: "#fff", boxSizing: "border-box" }} ref={ref}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactPDFPage
            pageNumber={props.number}
            renderTextLayer={false}
            width={props.width}
          />
        </Box>
      </Box>
    );
  },
);

export default Page;
