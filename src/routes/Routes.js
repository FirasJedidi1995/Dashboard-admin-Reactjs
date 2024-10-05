import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider.js";
import { ProtectedRoute } from "./ProtectedRoute.js";

import Logout from "../pages/Logout.js";
import Login from "../pages/Login";
import Dashboard from "../Dashboard/Dashboard.js";
import Users from "../Components/Users/Users.js";
import Categories from "../Components/Categories/Categories.js";
import Villes from "../Components/Villes/Villes.js";
import Regions from "../Components/Regions/Regions.js";
import Options from "../Components/Options/Options.js";
import Offres from "../Components/Offres/Offres.js";
import Home from "../pages/Home.js";
import RegistrationForm from "../registrationForm/RegistrationForm.js";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <Dashboard />,
          children: [
            {
              path: "/categories",
              element: <Categories />,
            },
            {
              path: "/users",
              element: <Users />,
            },
            {
              path: "/cities",
              element: <Villes />,
            },
            {
              path: "/regions",
              element: <Regions />,
            },
            {
              path: "/options",
              element: <Options />,
            },
            {
              path: "/offers",
              element: <Offres />,
            },
          ],
        },

        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/inscription",
      element: <RegistrationForm />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
