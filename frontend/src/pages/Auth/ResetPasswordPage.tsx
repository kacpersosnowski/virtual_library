import booksBg from "../../assets/books-bg.jpg";
import ResetPasswordForm from "../../components/Forms/auth/ResetPasswordForm";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import Card from "../../components/UI/Card/Card";

const ResetPasswordPage = () => {
  return (
    <ImageBackground image={booksBg}>
      <Card>
        <ResetPasswordForm />
      </Card>
    </ImageBackground>
  );
};

export default ResetPasswordPage;
