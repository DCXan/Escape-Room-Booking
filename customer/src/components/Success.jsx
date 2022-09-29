import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Success.css";

const Success = () => {
  return (
    <div className="success-container">
      <img className="success-img" src={require("./download.png")} alt="logo" />{" "}
      <p className="text-4xl">Your booking has been confirmed!</p>
      <p>A confirmation email has been sent.</p>
      <NavLink to={`/`}>
        <button>Book another Escape Room</button>
      </NavLink>
    </div>
  );
};

export default Success;
