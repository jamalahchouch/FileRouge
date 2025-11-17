import React,  {useState, useEffect}  from "react";
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
import DoctorList from "../components/DoctorList.jsx";
 


export default function Home() {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  return (
    <>
       <NavbarTop />
      <HeroSlider />
      <SearchBar />
      <DoctorList user={user} />
      <Steps />
      <Specialities />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}