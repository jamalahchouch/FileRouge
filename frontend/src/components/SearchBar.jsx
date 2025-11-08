import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa"; 
import { Container, Form, Button, InputGroup } from "react-bootstrap";

export default function SearchBar(){
  return (
    <div id="search" className="search-bar">
      <Container>
        <div className="card shadow-lg p-3"> 
          <Form className="d-flex flex-column flex-md-row gap-3 align-items-center">
            <InputGroup className="flex-grow-1">
              <InputGroup.Text className="bg-white border-0 ps-3"><FaSearch color="#6c757d" /></InputGroup.Text>
              <Form.Control className="border-0 ps-0" placeholder="Spécialité, médecin, établissement..." />
            </InputGroup>

            <InputGroup className="flex-grow-1">
              <InputGroup.Text className="bg-white border-0 ps-3"><FaMapMarkerAlt color="#6c757d" /></InputGroup.Text>
              <Form.Control className="border-0 ps-0" placeholder="Ville, code postal..." />
            </InputGroup>
            
            <Button style={{backgroungColor:'#6AADB7'}} className="px-4 py-2">Rechercher</Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}