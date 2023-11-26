import booksBg from "../../assets/books-bg.jpg";
import RegisterForm from "../../components/Forms/auth/RegisterForm";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";

const RegisterPage = () => {
  return (
    <ImageBackground image={booksBg}>
      <RegisterForm />
    </ImageBackground>
  );
};

export default RegisterPage;
