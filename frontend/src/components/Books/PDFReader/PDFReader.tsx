import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import { Document } from "react-pdf";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";

import Page from "./Page";
import samplePdf from "../../../assets/harry.pdf";

const PDFReader = () => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [bookDimensions, setBookDimensions] = useState({
    width: null as number,
    height: null as number,
  });
  const containerRef = useRef(null);
  const flipBook = useRef(null);

  const nextButtonClick = () => {
    flipBook.current?.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current?.pageFlip().flipPrev();
  };

  const onPage = (e) => {
    setPage(e.data);
  };

  const handleInitialResize = (
    initialPageWidth: number,
    initialPageHeight: number,
  ) => {
    const containerWidth = containerRef.current.offsetWidth;

    if (initialPageWidth && initialPageHeight) {
      if (2 * initialPageWidth <= containerWidth + 20) {
        setBookDimensions({
          width: initialPageWidth,
          height: initialPageHeight,
        });
      } else {
        const ratio = initialPageWidth / initialPageHeight;
        const newWidth = containerWidth / 2 - 20;
        const newHeight = newWidth / ratio;
        setBookDimensions({ width: newWidth, height: newHeight });
      }
    }
  };

  useEffect(() => {
    const handleResize = (entries) => {
      entries.forEach(() => {
        const containerWidth = containerRef?.current.offsetWidth;
        const ratio = bookDimensions.width / bookDimensions.height;
        const newWidth = containerWidth / 2 - 20;
        const newHeight = newWidth / ratio;
        if (bookDimensions.width != newWidth) {
          setBookDimensions({ width: newWidth, height: newHeight });
        }
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [bookDimensions]);

  return (
    <Box
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "70%",
        height: bookDimensions.height + 100 + "px" || "1000px",
        backgroundColor: "#333333",
        marginBottom: "30px",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <Document
        file={samplePdf}
        onLoadSuccess={(doc: DocumentCallback) => {
          setTotalPage(doc.numPages);
          doc.getPage(1).then((s) => {
            handleInitialResize(s.view[2], s.view[3]);
          });
        }}
      >
        <HTMLFlipBook
          key={`${bookDimensions.width}-${bookDimensions.height}`}
          style={{}}
          startPage={page}
          drawShadow={false}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={1}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          width={bookDimensions.width || 595.25}
          height={bookDimensions.height || 842}
          size="fixed"
          minWidth={115}
          maxWidth={2000}
          minHeight={100}
          maxHeight={2533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="demo-book"
          ref={flipBook}
        >
          {Array.from({ length: totalPage }, (_, index) => index + 1).map(
            (pageNumber) => {
              return (
                <Page
                  key={pageNumber}
                  number={pageNumber}
                  width={bookDimensions.width || 595.25}
                />
              );
            },
          )}
        </HTMLFlipBook>
      </Document>

      <Box sx={{ color: "white", padding: "10px" }}>
        <Box>
          <Button type="button" onClick={prevButtonClick}>
            Previous page
          </Button>
          [<Box component="span">{page}</Box> of{" "}
          <Box component="span">{totalPage}</Box>]
          <Button type="button" onClick={nextButtonClick}>
            Next page
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PDFReader;
