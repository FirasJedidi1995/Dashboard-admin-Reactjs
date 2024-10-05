import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Toast, Table, Row, Col } from "react-bootstrap";
import Sidebar from "../../SideBar/Sidebar";
import { useAuth } from "../../provider/authProvider";

const Users = ({  }) => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const token = useAuth(); // Get the JWT token from your AuthProvider

  useEffect(() => {
    loadUsers(token);
    console.log(token.token)
  }, [token]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadUsers = ({token}) => {
    

    axios
      .get("http://localhost:8082/api/user", config.headers)
      .then((response) => {
        const usersData = response.data;
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });
  };

  const handleDeleteClick = (userId) => {
    console.log(userId)
    setSelectedUserId(userId);
    setShowToast(true);
  };

  const confirmDeletion = () => {
    axios
      .delete(`http://localhost:8082/api/user/${selectedUserId}`,config.headers)
      .then((response) => {
        console.log(response.data);
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== selectedUserId)
        );
        setShowToast(false);
        setSelectedUserId(null);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setShowToast(false);
      });
  };

  return (
    <>
      <Container>
        <div className="py-4 text-center">
          <h2 className="text-center my-4">Gestion des Utilisateurs</h2>

          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <Table bordered hover className="custom-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Numéro de téléphone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user ) => (
                    <tr >
                      <td>{user.id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td className="align-middle">
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteClick(user.id)}
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
                Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                <div className="mt-2 d-flex justify-content-between">
                  <Button variant="danger" onClick={confirmDeletion}>
                    Confirmer
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowToast(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </Toast.Body>
            </Toast>
          )}
        </div>
      </Container>
    </>
  );
};

export default Users;
