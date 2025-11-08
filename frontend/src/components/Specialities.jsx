import React from "react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,    // Excellent pour Médecine générale ou Cardiologie
  FaBrain,        // Idéal pour Neurologie
  FaBaby,         // Parfait pour Pédiatrie
  FaEye,          // Parfait pour Ophtalmologie
  FaBone,         // Parfait pour Orthopédie
  FaPills,        // Parfait pour Pharmacie
  FaRunning,      // Parfait pour Kinésithérapie

  FaStethoscope,  
} from "react-icons/fa"; 
const specialities = [
 
  { name: "Médecine générale", icon: <FaStethoscope /> }, 
  { name: "Cardiologie", icon: <FaHeartbeat /> }, 
  { name: "Pédiatrie", icon: <FaBaby /> },
  { name: "Ophtalmologie", icon: <FaEye /> },
  { name: "Orthopédie", icon: <FaBone /> },
  { name: "Neurologie", icon: <FaBrain /> }, 
  { name: "Pharmacie", icon: <FaPills /> },
  { name: "Kinésithérapie", icon: <FaRunning /> }
];

export default function Specialities(){
  return (
    <section id="services" className="py-5 bg-light">
      <div className="container text-center">
        <h3 className="section-title">Nos spécialités</h3>
        <p className="text-muted mb-5">Trouvez le professionnel dont vous avez besoin parmi un large choix de spécialités.</p>
        <div className="row justify-content-center">
          {specialities.map((s,i)=>(
            <motion.div key={i} className="col-6 col-md-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i*0.06, duration: 0.5 }}>
              <div className="specialities-card">
                <div className="icon mb-3">{s.icon}</div>
                <strong>{s.name}</strong>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}