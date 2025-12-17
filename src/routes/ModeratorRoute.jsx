
import { Navigate } from "react-router";
import useAuth from "../useHook/useAuth";


const ModeratorRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user && role === "moderator") {
    return children;
  }

  return <Navigate to="/" />;
};

export default ModeratorRoute;
