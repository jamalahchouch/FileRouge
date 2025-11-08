import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCalendarCheck, FaLaptopMedical } from "react-icons/fa"; // Nouvelles icônes

const steps = [
  { icon: <FaSearch/>, title: "1. Rechercher", text: "Trouvez rapidement le professionnel adapté à vos besoins." },
  { icon: <FaCalendarCheck/>, title: "2. Réserver", text: "Choisissez un créneau horaire qui vous convient et réservez." },
  { icon: <FaLaptopMedical/>, title: "3. Consulter", text: "Effectuez votre consultation, en cabinet ou en téléconsultation." },
];

export default function Steps(){
  return (
    <section className="py-5" id="about">
      <div className="container text-center">
        <h3 className="section-title">Comment ça marche ?</h3>
        <p className="text-muted mb-5">Prenez rendez-vous en quelques clics, c'est simple et rapide.</p>
        <div className="row justify-content-center">
          {steps.map((s,i)=>(
            <div className="col-md-4 mb-4" key={i}>
              <motion.div className="card steps h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i*0.15, duration: 0.6 }}>
                <div className="steps-icon">{s.icon}</div>
                <h5>{s.title}</h5>
                <p className="text-muted">{s.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}