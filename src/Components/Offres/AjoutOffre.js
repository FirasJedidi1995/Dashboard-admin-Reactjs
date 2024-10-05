import React, { useState } from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";

const AjoutOffre = ({ onAddOffer, onClose }) => {
  const [offerName, setOfferName] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (!offerName) return;
    onAddOffer(offerName);
    setOfferName("");
    onClose();
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="offerName">
            <Form.Label column sm={3}>
              Nom de l'Offre:
            </Form.Label>
            <Col sm={6} className="mb-3">
              {" "}
              {/* mb-3 adds margin bottom */}
              <Form.Control
                type="text"
                placeholder="Entrez le nom de l'offre"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
              />
            </Col>
            <Col sm={3} />{" "}
            {/* Colonne vide pour pousser le contenu vers la gauche */}
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

export default AjoutOffre;
