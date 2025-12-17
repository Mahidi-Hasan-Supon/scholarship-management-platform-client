
import { Navigate } from "react-router";
import useAuth from "../useHook/useAuth";



const AdminRoutes = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user && role === "admin") return children;

  return <Navigate to="/" />;
};

export default AdminRoutes;
