import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <p className="text-4xl">Your booking has been confirmed</p>
      <p>A confirmation email has been sent.</p>
      <NavLink to={`/`}>Book another Escape Room</NavLink>
    </div>
  );
};

export default Success;
