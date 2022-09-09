import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const token = localStorage.getItem("jsonwebtoken");

  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    return props.children;
  }
}

export default ProtectedRoute;
