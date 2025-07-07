import { Navigate } from "react-router-dom"; 

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
// console.log("PrivateRoute - User:", user);

  if (!token || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;