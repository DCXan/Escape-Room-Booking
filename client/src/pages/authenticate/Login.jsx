import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  let Navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const response = await res.json();
      if (response.success) {
        const token = response.token;
        localStorage.setItem("jsonwebtoken", token);
        console.log(response);
        Navigate(`/home`);
      } else {
        console.log("could not post to database");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <p className="font-semibold text-xl ">Log In</p>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          className="lInput"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="lButton bg-sky-500 "
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
