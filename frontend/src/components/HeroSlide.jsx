import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../App.css"; 

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://industries.ma/wp-content/uploads/2024/04/E-Sant%C3%A9-les-innovations-et-les-soins-intelligents.png", // Image plus générique/professionnelle
      title: "Votre santé, notre priorité",
      text: "Prenez rendez-vous simplement, avec des professionnels de confiance."
    },
    {
      id: 2,
      image: "https://fr.le360.ma/resizer/v2/PYK4DQN2SBCTVDV5JWQBU5GFXM.jpg?auth=573a5dc4d5b9be81312f53758a31d22529b751bc600e7c296453e922b3b70b99&smart=true&width=1216&height=684",
      title: "Des soins de qualité pour tous",
      text: "Accédez à un réseau de spécialistes attentifs à vos besoins de santé."
    },
    {
      id: 3,
      image: "https://laquotidienne.ma/uploads/actualites/62909a138affc_Digitalisation%20sante%CC%81%20LQ.jpeg",
      title: "Simplifiez vos démarches médicales",
      text: "Réservez, gérez et suivez vos rendez-vous depuis une seule plateforme."
    }
  ];

  return (
    <section id="hero">
      <Carousel fade controls={false} indicators interval={5000}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img src={slide.image} alt={slide.title} className="d-block w-100" />
            <div className="hero-overlay"></div> {/* Pour le dégradé */}

            <Carousel.Caption>
              <motion.div
                className="hero-box"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <div className="hero-ctas">
                  <Button href="#search" variant="primary" className="me-3">Prendre rendez-vous</Button>
                  <Button href="#services" variant="outline-light">Découvrir les services</Button>
                </div>
              </motion.div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSlider;