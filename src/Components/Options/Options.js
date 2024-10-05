import React, { useState } from "react";
import { Button, Container, Toast, Table, Row, Col } from "react-bootstrap";
import AjoutOption from "./AjoutOption";
import Sidebar from "../../SideBar/Sidebar";
//import "./options.css";

const Options = () => {
  const [options, setOptions] = useState([
    {
      id: 1,
      name: "Climatisé",
      categories: ["Maison", "Appartement", "Studio"],
    },
    {
      id: 2,
      name: "chauffé",
      categories: ["Maison", "Bureau"],
    },
    {
      id: 3,
      name: "vue sur mer",
      categories: ["Maison", "Villa"],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleDeleteClick = (optionId) => {
    setSelectedOptionId(optionId);
    setShowToast(true);
  };

  const confirmDeletion = () => {
    setOptions((currentOptions) =>
      currentOptions.filter((option) => option.id !== selectedOptionId)
    );
    setShowToast(false);
    setSelectedOptionId(null);
  };

  const addOption = (optionName, categories = []) => {
    const newId =
      options.length > 0 ? Math.max(...options.map((o) => o.id)) + 1 : 1;
    setOptions([...options, { id: newId, name: optionName, categories }]);
  };

  return (
    <Container>
      <div className="py-4 text-center">
        <h2 className="text-center my-4">Gestion des Options</h2>
        <Button
          className="btn-primary-custom mb-4 my-3"
          onClick={() => setShowForm(true)}
        >
          Ajouter Option
        </Button>
        {showForm && (
          <AjoutOption
            onAddOption={addOption}
            onClose={() => setShowForm(false)}
          />
        )}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Table bordered hover className="custom-table text-center">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nom de l'option</th>
                  <th>Catégories Associées</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {options.map((option) => (
                  <tr key={option.id}>
                    <td>{option.id}</td>
                    <td>{option.name}</td>
                    <td>
                      <ul>
                        {option.categories.map((category, index) => (
                          <li key={index}>{category}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="align-middle">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(option.id)}
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
              Êtes-vous sûr de vouloir supprimer cette option ?
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

export default Options;
