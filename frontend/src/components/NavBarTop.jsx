import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";

export default function NavbarTop() {
  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand href="#" className="fw-bold fs-4 text-primary">
          
          <span style={{color: 'var(--primary-blue)'}}>DOC<span style={{color: 'var(--text-dark)'}}>TOR</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-3">
            <Nav.Link href="#find-pro" className="fw-medium">Acueil</Nav.Link>
            <Nav.Link href="#patients" className="fw-medium">apropos</Nav.Link>
            <Nav.Link href="#establishments" className="fw-medium">Services</Nav.Link>
            <Nav.Link href="#contact" className="fw-medium" >Contact</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-primary" className="rounded-pill px-4">S'inscrire</Button>
            <Button variant="primary" className="rounded-pill px-4">Se connecter</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}