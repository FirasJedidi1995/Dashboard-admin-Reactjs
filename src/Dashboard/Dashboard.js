import React from "react";
import Sidebar from "../SideBar/Sidebar";
import { Routes, Route } from "react-router-dom";
import "./dashboard.css";
import Offres from "../Components/Offres/Offres";
import Options from "../Components/Options/Options";
import Regions from "../Components/Regions/Regions";
import Villes from "../Components/Villes/Villes";
import Users from "../Components/Users/Users";
import Categories from "../Components/Categories/Categories";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/cities" element={<Villes />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/offers" element={<Offres />} />
          <Route path="/options" element={<Options />} />
          <Route path="/categories" element={<Categories /> }  />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
