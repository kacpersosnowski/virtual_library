import "./App.css";
import MainNavbar from "./components/Layout/MainNavbar";
import Banner from "./components/Layout/Banner/Banner";
import BooksList from "./components/Books/BooksList/BooksList";

function App() {
  return (
    <>
      <MainNavbar />
      <Banner />
      <BooksList />
    </>
  );
}

export default App;
