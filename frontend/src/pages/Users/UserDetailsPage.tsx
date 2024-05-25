import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import UserDetails from "../../components/Users/UserDetails";
import booksBg from "../../assets/books-bg2.jpg";
import Card from "../../components/UI/Card/Card";

const UserDetailsPage = () => {
  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        <UserDetails />
      </Card>
    </ImageBackground>
  );
};

export default UserDetailsPage;
