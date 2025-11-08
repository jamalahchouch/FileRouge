import React from "react";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-5 my-5">
      <Container>
        <motion.div 
          className="card text-center p-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="mb-3">Besoin d'aide ou d'informations supplémentaires ?</h3>
          <p className="lead mb-4">Notre équipe est là pour vous accompagner. Contactez-nous dès maintenant.</p>
          <Button variant="light" href="mailto:contact@doccilab.com" className="mx-auto">Nous contacter</Button>
        </motion.div>
      </Container>
    </section>
  );
}