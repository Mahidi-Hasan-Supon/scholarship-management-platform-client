import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './layout/Root.jsx';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import AuthProvider from './compunents/context/AuthProvider.jsx';
// import AuthProvider from '../compunents/context/AuthProvider';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
       path:'/',
       Component:Home
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/login',
        Component:Login
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />,
   </AuthProvider>
  </StrictMode>,
)
