import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";

const AjoutVille = () => {
  const [villeName, setVilleName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [RegionData, setRegionData] = useState([]);
  const token = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    console.log(token.token);
    loadRegions(token);
  }, [token]);

  const loadRegions = () => {
    axios
      .get("http://localhost:8082/api/region", config.headers)
      .then((response) => {
        const Region = response.data;
        setRegionData(Region);
      })
      .catch((error) => {
        console.error("Error loading regions:", error);
      });
  };
  
  const submitHandler = (event) => {
   
    const villeData ={
      nomVille:  villeName,
      region_id:selectedRegion ,
    };
   
    axios
      .post("http://localhost:8082/api/ville", villeData, config.headers)
      .then((response) => {
       // onAddVille(response.data);
        setVilleName("");
        setSelectedRegion(null);
       // onClose();
      
     
      })
      .catch((error) => {
      
        console.error("Error adding ville:", error);
      });
  };
  const handleRegionChange = (selectedRegions) => {
    setSelectedRegion(selectedRegions);
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <Form onSubmit={submitHandler} >
          <Form.Group as={Row} controlId="villeName">
            <Form.Label column sm={3}>
              Nom Ville:
            </Form.Label>
            <Col sm={6} className="mb-3">
              {" "}
              {/* mb-3 adds margin bottom */}
              <Form.Control
                name="nomVille"
                type="text"
                placeholder="Entrez le nom de la ville"
                value={villeName}
                onChange={(e) => setVilleName(e.target.value)}
              />
            </Col>
            <Col sm={3} />{" "}
            {/* Colonne vide pour pousser le contenu vers la gauche */}
          </Form.Group>
          <Form.Group as={Row} controlId="regionSelect">
            <Form.Label column sm={3}>
              Region:.
            </Form.Label>
            <Col sm={6}>
              {/* <Select
                options={RegionData}
                value={selectedRegions}
                onChange={handleRegionChange}
                className="basic-single"
                classNamePrefix="select"
              /> */}
              <Form.Select onChange={(e)=>{setSelectedRegion(e.target.value)}} name="region_id" aria-label="Default select example">
              <option  selected >select region</option>
                {RegionData.map((region) => (
                  <option   value={region.id}  >{region.nomRegion}</option>
                
                ))}

              </Form.Select>
            </Col>
            <Col sm={3} />
          </Form.Group>
          <Row>
            <Col sm={12} className="text-center">
              <Button variant="primary" type="submit"    className="m-2">
                Ajouter
              </Button>
              <Button variant="secondary" onClick={handleRegionChange}className="m-2">
                Annuler
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AjoutVille;
