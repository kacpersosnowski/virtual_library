import "./App.css";
import MainNavbar from "./components/Layout/MainNavbar";
import Banner from "./components/Layout/Banner/Banner";
import BooksList from "./components/Books/BooksList/BooksList";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
      <MainNavbar />
      <Banner />
      <BooksList />
      <Footer />
    </>
  );
}

export default App;
