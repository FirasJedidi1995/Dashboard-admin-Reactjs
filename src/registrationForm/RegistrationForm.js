import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Assurez-vous que Bootstrap est installé
import "./registrationForm.css";
import { Modal, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleModalClose = () => setShowModal(false);
  const handleConfirm = () => {
    console.log(formData);
    handleModalClose();
  };

  return (
    <><Navbar />
    <div className="container my-5">
      <h2 className="form-title">Inscription</h2>

      <div className="registration-form-container">
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Prénom
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required />
              <span className="input-group-text">
                <i className="pi pi-user"></i>
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Nom
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required />
              <span className="input-group-text">
                <i className="pi pi-user"></i>
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Votre Adresse
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required />
              <span className="input-group-text">
                <i className="pi pi-home"></i>
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Votre numéro de téléphone
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <img
                  src={require("../images/tun.png")} // Make sure the path is correct
                  alt="Tunisia Flag"
                  style={{ marginRight: "5px", width: "20px" }} // Adjust the styling as needed
                />
                +216
              </span>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{8}"
                title="Le numéro de téléphone doit contenir 8 chiffres."
                minLength="8"
                maxLength="8"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                } } />
              <span className="input-group-text">
                <i className="pi pi-phone"></i>
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Votre email
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required />
              <span className="input-group-text">
                <i className="pi pi-at"></i>
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Votre mot de passe
            </label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required />
              <span className="input-group-text">
                <i className="pi pi-lock"></i>
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mx-auto">
            Valider
          </button>
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Conditions Générales d'Utilisation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Je reconnais avoir lu et accepté les Conditions Générales
              d'Utilisation
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Je refuse
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Je confirme
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div></>
  );
}

export default RegistrationForm;
