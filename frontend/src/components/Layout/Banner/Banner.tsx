import { Container } from "@mui/material";

import banner from "../../../assets/banner.jpg";
import WelcomeElement from "./WelcomeElement";

const Banner = () => {
  return (
    <Container
      maxWidth={false}
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "70vh",
        marginTop: "64px",
        paddingTop: "15vh",
        paddingBottom: "5vh",
      }}
    >
      <WelcomeElement />
    </Container>
  );
};

export default Banner;
