import PDFReader from "../../components/Books/PDFReader/PDFReader";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";

import booksBg from "../../assets/books-bg3.jpg";

const ReadBookPage = () => {
  return (
    <>
      <ImageBackground
        image={booksBg}
        containerSx={{ alignItems: "flex-start" }}
        gradientSx={{ opacity: 0.2 }}
      >
        <PDFReader />
      </ImageBackground>
    </>
  );
};

export default ReadBookPage;
