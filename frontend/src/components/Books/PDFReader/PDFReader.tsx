import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import { Document } from "react-pdf";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";

import Page from "./Page";
import samplePdf from "../../../assets/harry.pdf";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { LeftArrow, RightArrow } from "../../Layout/common/arrows";

const PDFReader = () => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [doc, setDoc] = useState<DocumentCallback>(null);
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

  const bookMargin = 100;

  const handleInitialResize = (
    initialPageWidth: number,
    initialPageHeight: number,
  ) => {
    const containerWidth = containerRef.current.offsetWidth;
    const ratio = initialPageWidth / initialPageHeight;
    const newWidth = containerWidth / 2 - bookMargin;
    const newHeight = newWidth / ratio;
    if (
      bookDimensions.width != newWidth ||
      bookDimensions.height != newHeight
    ) {
      setBookDimensions({ width: newWidth, height: newHeight });
    }
  };

  useEffect(() => {
    const handleResize = (entries) => {
      entries.forEach(() => {
        const containerWidth = containerRef.current.offsetWidth;
        const ratio = bookDimensions.width / bookDimensions.height;
        const newWidth = containerWidth / 2 - bookMargin;
        const newHeight = newWidth / ratio;
        if (
          bookDimensions.width &&
          bookDimensions.height &&
          (bookDimensions.width != newWidth ||
            bookDimensions.height != newHeight)
        ) {
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

  useEffect(() => {
    const getFirstPage = doc?.getPage(page);
    const getNextPage = doc?.getPage(page + 1);

    Promise.all([getFirstPage, getNextPage])
      .then((pages) => {
        const [page1, page2] = pages;
        if (page1 && page2) {
          console.log(page1.view, page2.view);
          if (
            Math.abs(page1.view[2] - page2.view[2]) >= 15 ||
            Math.abs(page1.view[3] - page2.view[3]) >= 15
          ) {
            const smallerPage = page1.view[2] <= page2.view[2] ? page1 : page2;
            handleInitialResize(smallerPage.view[2], smallerPage.view[3]);
          }
        }
      })
      .catch(() => {});
  }, [page]);

  return (
    <Box
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "70%",
        height: bookDimensions.height + 50 + "px" || "1000px",
        backgroundColor: "#333333",
        marginBottom: "30px",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <LeftArrow disabled={page === 0} onClick={prevButtonClick} />
        <Document
          file={samplePdf}
          loading={<LoadingSpinner />}
          onLoadSuccess={(doc: DocumentCallback) => {
            setTotalPage(doc.numPages);
            setDoc(doc);
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
        <RightArrow
          disabled={page === totalPage - 1}
          onClick={nextButtonClick}
        />
      </Box>

      {/* <Box sx={{ color: "white", padding: "10px", mt: "20px" }}>
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
      </Box> */}
    </Box>
  );
};

export default PDFReader;
