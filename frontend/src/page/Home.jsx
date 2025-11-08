import React from "react";
import Hero from "../components/HeroSlide.jsx";  
import Steps from "../components/Steps.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Specialities from "../components/Specialities.jsx";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ScrollTop from "../components/ScrollTop.jsx";
import Contact from "../components/Contact.jsx";
import NavbarTop from "../components/NavBarTop.jsx";
import HeroSlider from "../components/HeroSlide.jsx";


export default function Home() {
  return (
    <>
       <NavbarTop />
      <HeroSlider />
      <SearchBar />
      <Steps />
      <Specialities />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}