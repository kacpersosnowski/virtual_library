import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import booksBg from "../../assets/books-bg3.jpg";
import AddBookListForm from "../../components/Forms/bookLists/AddBookListForm";
import Card from "../../components/UI/Card/Card";

const AddBookListPage = () => {
  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        <AddBookListForm />
      </Card>
    </ImageBackground>
  );
};

export default AddBookListPage;
