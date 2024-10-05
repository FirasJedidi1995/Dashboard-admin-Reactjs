import React, { useState } from "react";
import "./AddUser.css";
const AddUser = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
  });

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New User</h2>
        <form>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => {
              /* Logic to add user */ onClose();
            }}
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
