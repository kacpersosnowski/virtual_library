import "./App.css";
import MainNavbar from "./components/Layout/MainNavbar";
import Banner from "./components/Layout/Banner/Banner";
import BookItem from "./components/Books/BookItem";

function App() {
  return (
    <>
      <MainNavbar />
      <Banner />
      <BookItem />
    </>
  );
}

export default App;
