import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Gère la visibilité du bouton
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Apparaît après 300px de défilement
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fait défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-top">
          <FaArrowUp />
        </button>
      )}
    </>
  );
}