import React, { useState } from "react";
import { Button, Container, Toast, Table, Row, Col } from "react-bootstrap";
import AjoutCategorie from "./AjoutCategorie";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Maison", options: ["Climatisé", "chauffé", "vue sur mer"] },
    { id: 2, name: "Appartement", options: ["Ascenseur", "Parking", "Balcon"] },
    { id: 3, name: "Studio", options: ["Meublé", "Centre ville"] },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedCategorieId, setSelectedCategorieId] = useState(null);

  const handleDeleteClick = (categorieId) => {
    setSelectedCategorieId(categorieId);
    setShowToast(true);
  };

  const confirmDeletion = () => {
    setCategories((currentCategories) =>
      currentCategories.filter(
        (categorie) => categorie.id !== selectedCategorieId
      )
    );
    setShowToast(false);
    setSelectedCategorieId(null);
  };

  const addCategorie = (categorieName, options = []) => {
    const newId =
      categories.length > 0
        ? Math.max(...categories.map((categorie) => categorie.id)) + 1
        : 1;
    setCategories([...categories, { id: newId, name: categorieName, options }]);
  };

  return (
    <Container>
      <div className="py-4 text-center">
        <h2 className="text-center my-4">Gestion des Catégories</h2>
        <Button
          className="btn-primary-custom mb-4  my-3"
          onClick={() => setShowForm(true)}
        >
          Ajouter Catégorie
        </Button>
        {showForm && (
          <AjoutCategorie
            onAddCategorie={addCategorie}
            onClose={() => setShowForm(false)}
          />
        )}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nom de la catégorie</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((categorie) => (
                  <tr key={categorie.id}>
                    <td>{categorie.id}</td>
                    <td>{categorie.name}</td>
                    <td className="align-middle">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(categorie.id)}
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
              Êtes-vous sûr de vouloir supprimer cette catégorie ?
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

export default Categories;
