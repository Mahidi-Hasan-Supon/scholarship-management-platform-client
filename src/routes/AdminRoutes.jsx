
import { Navigate } from "react-router";
import useAuth from "../useHook/useAuth";
import useRole from "../useHook/useRole";
import Loading from "../compunents/Loading/Loading";



const AdminRoutes = ({ children }) => {
  const { user,  loading } = useAuth();
  const [role , isRoleLoading] = useRole()

  if (loading) return <p>Loading...</p>;
  if(isRoleLoading)return <Loading></Loading>
  if (user && role === "admin") return children;
  console.log(role);
  return <Navigate to="/login" />;
};

export default AdminRoutes;
