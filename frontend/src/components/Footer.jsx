import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Nav } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer mt-auto py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">DOCTOR</h5>
            <p>
              Simplifiez votre parcours de soin. Trouvez et réservez des rendez-vous médicaux en ligne, 24h/24 et 7j/7.
            </p>
            <div className="d-flex gap-3 fs-5 mt-4">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-3">Patients</h5>
            <Nav className="flex-column">
              <Nav.Link href="#search">Rechercher un praticien</Nav.Link>
              <Nav.Link href="#about">Comment ça marche ?</Nav.Link>
              <Nav.Link href="#services">Nos spécialités</Nav.Link>
            </Nav>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Professionnels de santé</h5>
            <Nav className="flex-column">
              <Nav.Link href="#">Créer mon profil</Nav.Link>
              <Nav.Link href="#">Logiciel de gestion</Nav.Link>
              <Nav.Link href="#">Téléconsultation</Nav.Link>
            </Nav>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Support</h5>
            <Nav className="flex-column">
              <Nav.Link href="#contact">Contactez-nous</Nav.Link>
              <Nav.Link href="#">FAQ</Nav.Link>
              <Nav.Link href="#">Mentions légales</Nav.Link>
              <Nav.Link href="#">Politique de confidentialité</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <div className="text-center text-secondary small">
          &copy; {new Date().getFullYear()} DOCTOR. Tous droits réservés.
        </div>
      </Container>
    </footer>
  );
}