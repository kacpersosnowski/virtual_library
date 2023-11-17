import { Container } from "@mui/material";

import banner from "../../../assets/banner.jpg";
import WelcomeElement from "./WelcomeElement";
import { motion, useScroll, useTransform } from "framer-motion";

const Banner = () => {
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 300], [0, -100]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "70vh",
        marginTop: "64px",
        paddingTop: "15vh",
        paddingBottom: "5vh",
        opacity: imageOpacity,
        y: imageY,
      }}
    >
      <Container maxWidth={false}>
        <WelcomeElement />
      </Container>
    </motion.div>
  );
};

export default Banner;
