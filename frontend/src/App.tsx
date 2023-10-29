import "./App.css";
import MainNavbar from "./components/Layout/MainNavbar";
import Banner from "./components/Layout/Banner/Banner";
import BooksList from "./components/Books/BooksList";
import BookItem from "./components/Books/BookItem";

function App() {
  return (
    <>
      <MainNavbar />
      <Banner />
      <BooksList />
      <BookItem priority={10} />
    </>
  );
}

export default App;
