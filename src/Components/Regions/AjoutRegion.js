import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
const AjoutRegion = ({ onAddRegion, onClose }) => {
  const [regionName, setRegionName] = useState("");
  const token = useAuth();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  

  const submitHandler = (event) => {
    event.preventDefault();
    const regionData ={
      nomRegion:  regionName,
      
    };
    axios
    .post("http://localhost:8082/api/region", regionData, config.headers)
    .then((response) => {
     // onAddVille(response.data);
      setRegionName("");
      
      onClose();
    
   
    })
    .catch((error) => {
    
      console.error("Error adding region:", error);
    });
  };
  
 

  // const handleVilleChange = (selectedRegions) => {
  //   setSelectedVilles(selectedRegions || []);
  // };

  return (
    <Card className="my-4">
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="regionName">
            <Form.Label column sm={3}>
              Nom de Region:
            </Form.Label>
            <Col sm={6} className="mb-3">
              
              <Form.Control
                type="text"
                placeholder="Entrez le nom de Region"
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
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

export default AjoutRegion;
