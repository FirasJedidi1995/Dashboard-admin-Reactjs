import React, { useState } from "react";
import { Button, Container, Toast, Table, Row, Col } from "react-bootstrap";
//import "./offres.css"; // Assurez-vous que le fichier CSS est correctement lié
import AjoutOffre from "./AjoutOffre"; // Importez le composant de formulaire correctement renommé

const Offres = () => {
  const [offers, setOffers] = useState([
    { id: 1, name: "À Vendre" },
    { id: 2, name: "À Louer" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const handleDeleteClick = (offerId) => {
    setSelectedOfferId(offerId);
    setShowToast(true);
  };

  const confirmDeletion = () => {
    setOffers((offers) =>
      offers.filter((offer) => offer.id !== selectedOfferId)
    );
    setShowToast(false);
    setSelectedOfferId(null);
  };

  const addOffer = (offerName) => {
    const newId =
      offers.length > 0 ? Math.max(...offers.map((offer) => offer.id)) + 1 : 1;
    setOffers([...offers, { id: newId, name: offerName }]);
  };

  return (
    <Container>
      <div className="py-4 text-center">
        <h2 className="text-center my-4">Gestion des Offres</h2>
        <Button
          className="btn-primary-custom mb-4 my-3"
          onClick={() => setShowForm(true)}
        >
          Ajouter Offre
        </Button>
        {showForm && (
          <AjoutOffre
            onAddOffer={addOffer}
            onClose={() => setShowForm(false)}
          />
        )}
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nom de l'offre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{offer.id}</td>
                    <td>{offer.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(offer.id)}
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
            position="middle-center" // Note: Cette propriété n'est pas standard dans React-Bootstrap
          >
            <Toast.Body>
              Êtes-vous sûr de vouloir supprimer cette offre ?
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

export default Offres;
