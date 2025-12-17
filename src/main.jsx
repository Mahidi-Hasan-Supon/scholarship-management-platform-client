import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layout/Root.jsx";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import AuthProvider from "./compunents/context/AuthProvider.jsx";
import AllScholarship from "./pages/AllScholarship/AllScholarship.jsx";
import CardDetails from "./pages/cardDetails/CardDetails.jsx";
import Dashboard from "./layout/Dashboard.jsx";
import AddScholarship from "./Sidebar/AddScholarship.jsx";
import MyApplications from "./Sidebar/MyApplications.jsx";
import ManageApplications from "./Sidebar/ManageApplications.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import ModeratorRoute from "./routes/ModeratorRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/allScholarship",
        Component: AllScholarship,
        //  loader:()=>fetch('http://localhost:5000/scholarship')
      },
      {
        path: "/cardDetails/:id",
        Component: CardDetails,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      // { index: true, element: <MyProfile /> },

      // ✅ Admin routes
      {
        path: "add-scholarship",
        element: (
          // <AddScholarship />
          <AdminRoutes>
            <AddScholarship />
          </AdminRoutes>
        ),
      },
      // {
      //   path: "manage-scholarship",
      //   element: (
      //     <AdminRoutes>
      //       <ManageScholarship />
      //     </AdminRoutes>
      //   ),
      // },
      // {
      //   path: "manage-users",
      //   element: (
      //     <AdminRoutes>
      //       <ManageUsers />
      //     </AdminRoutes>
      //   ),
      // },
      // {
      //   path: "analytics",
      //   element: (
      //     <AdminRoutes>
      //       <Analytics />
      //     </AdminRoutes>
      //   ),
      // },

      // // ✅ Moderator routes
      // {
      //   path: "applications",
      //   element: (

      //     <ModeratorRoute>
      //       <ManageApplications />
      //     </ModeratorRoute>
      //   ),
      // },
      // {
      //   path: "reviews",
      //   element: (
      //     <ModeratorRoute>
      //       <AllReviews />
      //     </ModeratorRoute>
      //   ),
      // },

      // ✅ Student routes
      {
        path: "my-applications",
        element: <MyApplications />,
      },
      // {
      //   path: "my-reviews",
      //   element: <MyReviews />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
