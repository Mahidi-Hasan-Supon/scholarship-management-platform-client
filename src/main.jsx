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
import ManageScholarship from "./Dashboard/ManageScholarship.jsx";
import ManageAppliedApplications from "./Dashboard/ManageAppliedApplications.jsx";
import AllReviews from "./Dashboard/AllReviews.jsx";
import MyReviews from "./Dashboard/MyReviews.jsx";
import ErrorPage from "./compunents/ErrorPage/ErrorPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <PrivateRoute><CardDetails></CardDetails></PrivateRoute> ,
      },
      {
        path: "/success-payment",
        // Component: SuccessPayment,
        element:<PrivateRoute>
          <SuccessPayment></SuccessPayment>
        </PrivateRoute>
      },
      {
        path: "/canceled-payment",
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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "add-scholarship",
        element: <PrivateRoute><AddScholarship></AddScholarship></PrivateRoute> ,
      },
      {
        path: "manage-users",
        element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute> ,
      },
      {
        path: "my-applications",
        element:<PrivateRoute><MyApplications></MyApplications></PrivateRoute> ,
      },
      {
        path: "manage-scholarship",
        element:<PrivateRoute><ManageScholarship></ManageScholarship></PrivateRoute> ,
      },
      {
        path: "manage-applied-applications",
        element: (
          <PrivateRoute>
              <ManageAppliedApplications></ManageAppliedApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "all-reviews",
        element: <PrivateRoute><AllReviews></AllReviews></PrivateRoute>,
      },
      {
        path: "my-reviews",
        element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute> ,
      },
      {
        path: "profile",
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>,
      },
    ],
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <div>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
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
