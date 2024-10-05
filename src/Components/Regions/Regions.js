import React, { useEffect, useState } from "react";
import { Button, Container, Toast, Table, Row, Col } from "react-bootstrap";
import AjoutRegion from "./AjoutRegion";
import "./regions.css";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const token = useAuth();

  useEffect(() => {
    loadRegions(token);
    console.log(token.token);
  }, [token]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const loadRegions=()=>{
    axios
    .get("http://localhost:8082/api/region", config.headers)
    .then((response)=>{
      const RegionData=response.data;
      setRegions(RegionData)
    })
    .catch((error) => {
      console.error("Error loading regions:", error);
    });
  }



  const handleDeleteClick = (regionId) => {
    setSelectedRegionId(regionId);
    setShowToast(true);
  };

  const confirmDeletion = () => {
    axios
    .delete(
      `http://localhost:8082/api/region/${selectedRegionId}`,
      config.headers
    )
    .then((response) => {
      console.log(response.data);
      setRegions((currentRegions) =>
        currentRegions.filter((region) => region.id !== selectedRegionId)
      );
      setShowToast(false);
      setSelectedRegionId(null);
    })
    .catch((error) => {
      console.error("Error deleting region:", error);
      setShowToast(false);
    });
};
  

  const addRegion = (regionName, villes = []) => {
    const newId =
      regions.length > 0 ? Math.max(...regions.map((r) => r.id)) + 1 : 1;
    setRegions([...regions, { id: newId, name: regionName, villes }]);
  };

  return (
    <Container>
      <div className="py-4 text-center">
        <h2 className="text-center my-4">Gestion des Régions</h2>
        <Button
          className="btn-primary-custom mb-4 my-3"
          onClick={() => setShowForm(true)}
        >
          Ajouter Région
        </Button>
        {showForm && (
          <AjoutRegion
            onAddRegion={addRegion}
            onClose={() => setShowForm(false)}
          />
        )}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nom de la région</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => (
                  <tr>
                    <td>{region.id}</td>
                    <td>{region.nomRegion}</td>
                    <td className="align-middle">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(region.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            className="custom-toast-style"
            bg="light"
            position="middle-center"
          >
            <Toast.Body>
              Êtes-vous sûr de vouloir supprimer cette région ?
              <div className="mt-2 d-flex justify-content-between">
                <Button variant="danger" onClick={confirmDeletion}>
                  Confirmer
                </Button>
                <Button variant="secondary" onClick={() => setShowToast(false)}>
                  Annuler
                </Button>
              </div>
            </Toast.Body>
          </Toast>
        )}
      </div>
    </Container>
  );
};

export default Regions;
