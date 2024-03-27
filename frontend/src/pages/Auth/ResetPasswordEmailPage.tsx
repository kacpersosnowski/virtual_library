import booksBg from "../../assets/books-bg.jpg";
import ResetPasswordEmailForm from "../../components/Forms/auth/ResetPasswordEmailForm";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import Card from "../../components/UI/Card/Card";

const ResetPasswordEmailPage = () => {
  return (
    <ImageBackground image={booksBg}>
      <Card>
        <ResetPasswordEmailForm />
      </Card>
    </ImageBackground>
  );
};

export default ResetPasswordEmailPage;
