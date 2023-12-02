import booksBg from "../../assets/books-bg.jpg";
import LoginForm from "../../components/Forms/auth/LoginForm";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";

const LoginPage = () => {
  return (
    <ImageBackground image={booksBg}>
      <LoginForm />
    </ImageBackground>
  );
};

export default LoginPage;
