import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import { Document } from "react-pdf";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import Page from "./Page";
import samplePdf from "../../../assets/pan-tadeusz.pdf";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { LeftArrow, RightArrow } from "../../Layout/common/arrows";
import ReadToolbar from "./ReadToolbar/ReadToolbar";
import { zoomActions } from "../../../store/redux/slices/zoom-slice";

const PDFReader = () => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [doc, setDoc] = useState<DocumentCallback>(null);
  const [bookDimensions, setBookDimensions] = useState({
    width: null as number,
    height: null as number,
  });
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const flipBook = useRef(null);

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    const handleFKeyPress = (e) => {
      if (e.key === "f" || e.key === "F") {
        handleFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    document.onkeydown = handleFKeyPress;

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
      document.onkeydown = null;
      dispatch(zoomActions.setScale(1));
    };
  }, []);

  useEffect(() => {
    const handleResize = (entries) => {
      entries.forEach(() => {
        if (isFullScreen) {
          const availableHeight = window.screen.availHeight - 100;
          const availableWidth = (window.screen.availWidth - 50) / 2;
          const ratio = bookDimensions.width / bookDimensions.height;
          let width: number, height: number;
          if (availableWidth / ratio <= availableHeight) {
            width = availableWidth;
            height = width / ratio;
          } else {
            height = availableHeight;
            width = height * ratio;
          }
          if (
            width !== bookDimensions.width ||
            height !== bookDimensions.height
          ) {
            setBookDimensions({ width, height });
          }
          return;
        }
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
  }, [bookDimensions, isFullScreen]);

  useEffect(() => {
    const getFirstPage = doc?.getPage(page);
    const getNextPage = doc?.getPage(page + 1);

    Promise.all([getFirstPage, getNextPage])
      .then((pages) => {
        const [page1, page2] = pages;
        if (page1 && page2) {
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

  const nextButtonClick = () => {
    flipBook.current?.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current?.pageFlip().flipPrev();
  };

  const turnToPage = (page: number) => {
    flipBook.current?.pageFlip().turnToPage(page);
    setPage(page);
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

  const enterFullscreen = () => {
    const elem = containerRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const handleContainerTransform = (ref: ReactZoomPanPinchRef) => {
    if (ref.state.scale !== 1) {
      if (!isZoomed) {
        setIsZoomed(true);
      }
      flipBook.current.pageFlip().setting.useMouseEvents = false;
    } else {
      if (isZoomed) {
        setIsZoomed(false);
      }
      flipBook.current.pageFlip().setting.useMouseEvents = true;
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: { xs: "100%", md: "70%" },
        height: bookDimensions.height + 140 + "px",
        backgroundColor: "#333333",
        marginBottom: "30px",
        overflow: "hidden",
        zIndex: 1,
        padding: "1rem",
      }}
    >
      <TransformWrapper
        doubleClick={{ disabled: true }}
        minScale={1}
        maxScale={2}
        panning={{
          disabled: !isZoomed,
        }}
        wheel={{
          disabled: false,
          activationKeys: !isFullScreen ? ["Control", "Shift"] : [],
          smoothStep: (0.001 * 0.2) / 0.12, // one scroll = 0.2 of scale
        }}
        onTransformed={handleContainerTransform}
        onWheel={(ref) => {
          dispatch(zoomActions.setScale(ref.state.scale));
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LeftArrow disabled={page === 0} onClick={prevButtonClick} />
          <TransformComponent>
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
                flippingTime={700}
                usePortrait={false}
                startZIndex={1}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={true}
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
          </TransformComponent>
          <RightArrow
            disabled={
              totalPage % 2 === 0
                ? page === totalPage - 1
                : page === totalPage - 2
            }
            onClick={nextButtonClick}
          />
        </Box>
        <ReadToolbar
          currentPage={page}
          totalPages={totalPage}
          onTurnPage={turnToPage}
          onHandleFullScreen={handleFullscreen}
        />
      </TransformWrapper>
    </Box>
  );
};

export default PDFReader;
