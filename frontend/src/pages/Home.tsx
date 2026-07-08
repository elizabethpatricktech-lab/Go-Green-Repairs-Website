import AboutUs from "./AboutUs";
import Navbar from "../components/Navbar";
import ContactForm from "../components/Contact";
import Hero from "./Hero";
import Services from "./Services";
import Finance from "./Finance";
import OurWork from "./OurWork";
import Reviews from "./Reviews";
import { projects } from "../data/projects";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation(); // 👈 add this

  useEffect(() => {
    if (location.hash) {
      const id = location.hash;

      // delay ensures DOM + images are ready
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          const yOffset = -80; // adjust based on navbar height
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Services></Services>
      <Finance></Finance>
      <AboutUs></AboutUs>
      <OurWork projects={projects}></OurWork>
      <Reviews></Reviews>
      <ContactForm></ContactForm>
    </div>
  );
};

export default Home;
