import { Router, Route, Routes } from "react-router-dom";
import Login from "../pages/authenticate/Login";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const Navigate = useNavigate();
  const token = localStorage.getItem("jsonwebtoken");

  if (!token) {
    return Navigate("/login");
  }

  return props.children;
}

export default ProtectedRoute;
