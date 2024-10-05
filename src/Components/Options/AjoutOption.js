import React, { useState } from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import Select from "react-select";

const AjoutOption = ({ onAddOption, onClose }) => {
  const [optionName, setOptionName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { value: "Maison", label: "Maison" },
    { value: "Appartement", label: "Appartement" },
    { value: "Studio", label: "Studio" },
    { value: "Bureau", label: "Bureau" },
    { value: "Villa", label: "Villa" },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    if (!optionName || selectedCategories.length === 0) return;
    onAddOption(
      optionName,
      selectedCategories.map((category) => category.value)
    );
    setOptionName("");
    setSelectedCategories([]);
    onClose();
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="optionName">
            <Form.Label column sm={3}>
              Nom de l'option:
            </Form.Label>
            <Col sm={6} className="mb-3">
              {" "}
              <Form.Control
                type="text"
                placeholder="Entrez le nom de l'option"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
              />
            </Col>
            <Col sm={3} />{" "}
          </Form.Group>
          <Form.Group as={Row} controlId="categorySelect">
            <Form.Label column sm={3}>
              Catégories Associées:
            </Form.Label>
            <Col sm={6}>
              <Select
                isMulti
                options={categories}
                value={selectedCategories}
                onChange={handleCategoryChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Col>
            <Col sm={3} />{" "}
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

export default AjoutOption;
