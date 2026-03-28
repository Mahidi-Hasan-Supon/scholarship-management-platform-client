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

// import MyApplications from "./Sidebar/MyApplications.js";
// import ManageApplications from "./Sidebar/ManageApplications.jsx";
// import AdminRoutes from "./routes/AdminRoutes.jsx";
// import ModeratorRoute from "./routes/ModeratorRoute.jsx";
import Loading from "./compunents/Loading/Loading.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuccessPayment from "./payment/SuccessPayment.jsx";
import AddScholarship from "./Dashboard/AddScholarship.jsx";
import Profile from "./Dashboard/Profile.jsx";
import CancelledPayment from "./payment/CancelledPayment.jsx";
import { ToastContainer } from "react-toastify";
import ManageUsers from "./Dashboard/ManageUsers.jsx";
import MyApplications from "./Dashboard/MyApplications.jsx";


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
        path: "/success-payment",
        Component: SuccessPayment,
      },
      {
        path: "/canceled-payment/:id",
        Component: CancelledPayment,
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
      {
        path: "add-scholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "my-applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <div>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />,
         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>,
);
