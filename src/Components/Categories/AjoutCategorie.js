import React, { useState } from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";

const AjoutCategorie = ({ onAddCategorie, onClose }) => {
  const [categorieName, setCategorieName] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (!categorieName) return;
    onAddCategorie(categorieName);
    setCategorieName("");
    onClose();
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="categorieName">
            <Form.Label column sm={3}>
              Nom de Catégorie:
            </Form.Label>
            <Col sm={6} className="mb-3">
              <Form.Control
                type="text"
                placeholder="Entrez le nom de catégorie"
                value={categorieName}
                onChange={(e) => setCategorieName(e.target.value)}
              />
            </Col>
            <Col sm={3} />
          </Form.Group>

          <Row>
            <Col sm={12} className="text-center">
              <Button variant="primary" type="submit" className="m-2">
                Ajouter
              </Button>
              <Button variant="secondary" onClick={onClose} className="m-2">
                Annuler
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AjoutCategorie;
