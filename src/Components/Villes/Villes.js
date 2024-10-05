import React, { useEffect, useState } from "react";
import { Button, Container, Toast, Table, Row, Col } from "react-bootstrap";
import AjoutVille from "./AjoutVille";
import "./ville.css";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
const Villes = () => {
  const [villes, setVilles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedVilleId, setselectedVilleId] = useState(null);
  const token = useAuth();
  const [region, setRegion] = useState([]);


  useEffect(() => {
    loadVilles(token);
    console.log(token.token);
    loadRegions(token);
    console.log(token.token);
  }, [token]);





  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadVilles = () => {
    axios
      .get("http://localhost:8082/api/ville", config.headers)
      
      .then((response) => {
        const VillesData = response.data;
        setVilles(VillesData);
        
      })
      .catch((error) => {
        console.error("Error loading villes:", error);
      });
  };
  
  const loadRegions=()=>{
    axios
    .get("http://localhost:8082/api/region", config.headers)
    .then((response)=>{
      const RegionData=response.data;
      setRegion(RegionData)
    })
    .catch((error) => {
      console.error("Error loading regions:", error);
    });
  }

  const handleDeleteClick = (villeId) => {
    setselectedVilleId(villeId);
    setShowToast(true);
  };

  const confirmDeletion = () => {
    axios
      .delete(
        `http://localhost:8082/api/ville/${selectedVilleId}`,
        config.headers
      )
      .then((response) => {
        console.log(response.data);
        setVilles((currentVilles) =>
          currentVilles.filter((ville) => ville.id !== selectedVilleId)
        );
        setShowToast(false);
        setselectedVilleId(null);
      })
      .catch((error) => {
        console.error("Error deleting ville:", error);
        setShowToast(false);
      });
  };
  const addVille = (villeName, region) => {
    const newId =
      villes.length > 0 ? Math.max(...villes.map((o) => o.id)) + 1 : 1;
    setVilles([...villes, { id: newId, name: villeName, region }]);
  };

  return (
    <Container>
      <div className="py-4 ">
        <h2 className="text-center my-4">Gestion des Villes</h2>
        <Button
          className="btn-primary-custom  mb-4 my-3"
          onClick={() => setShowForm(true)}
        >
          Ajouter Ville
        </Button>
        {showForm && (
          <AjoutVille
            onAddVille={addVille}
            onClose={() => setShowForm(false)}
          />
        )}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nom de la ville</th>
                  {/* <th>Région</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {villes.map((ville) => (
                  
                  <tr>
                    <td>{ville.id}</td>
                    <td>{ville.nomVille}</td>
                    {/* {region.map((region)=>

                    <td>{region.nomRegion}</td>)} */}
                    <td className="align-middle">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(ville.id)}
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
          >
            <Toast.Body>
              Êtes-vous sûr de vouloir supprimer cette ville ?
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

export default Villes;
