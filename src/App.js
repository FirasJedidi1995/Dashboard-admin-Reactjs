import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import {  Route } from "react-router-dom";
import RegistrationForm from "./registrationForm/RegistrationForm";
import Connexion from "./login/Connexion";
import Navbar from "./Navbar/Navbar";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
