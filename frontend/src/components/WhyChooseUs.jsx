import React from "react";
import { motion } from "framer-motion";

const items = [
  {title: "Disponibilité 24/7", text: "Réservez à tout moment, de jour comme de nuit, selon vos besoins spécifiques."},
  {title: "Confidentiel & sécurisé", text: "Vos données personnelles et médicales sont protégées avec les normes les plus strictes."},
  {title: "Rappels automatiques", text: "Ne manquez plus jamais un rendez-vous grâce à nos notifications SMS et email."},
  {title: "Professionnels vérifiés", text: "Tous les praticiens sont certifiés et évalués pour garantir des soins de qualité."},
];

export default function WhyChooseUs(){
  return (
    <section className="py-5">
      <div className="container text-center">
        <h3 className="section-title">Pourquoi nous choisir ?</h3>
        <p className="text-muted mb-5">Une plateforme conçue pour simplifier votre accès aux soins et vous offrir la meilleure expérience.</p>
        <div className="row justify-content-center">
          {items.map((it,i)=>(
            <div className="col-md-3 mb-4" key={i}>
              <motion.div className="why-card h-100" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i*0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}>
                <h6 className="fw-bold">{it.title}</h6>
                <p className="small">{it.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}