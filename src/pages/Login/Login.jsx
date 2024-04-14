import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Changed function name to avoid conflict
import { Login as loginUser } from "../../services/users.js"; 
import logo from "../../../public/Riff.png";
import "./Login.css"; // Moved import statement to the top

function Login({ setUser }) {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginUser(loginForm); // Fixed variable name to match
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoginForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Invalid Credentials",
        password: "", // Clear password field on error
      }));
    }
  };

  const formError = () => {
    const toggleForm = loginForm.isError ? "submit-btn" : "submit-btn";

    if (loginForm.isError) {
      return <button className={toggleForm} type="submit" > {loginForm.errorMsg} </button>;
    } else {
      return <button className='submit-btn' type="submit">Log In</button>;
    }
  };

  return (
    <div className="root-Login">
      <div id="logo-container-Login">
        <img src={logo} alt="the RIff logo" id="logo-Login" />
        <h2 style={{
          "textAlign": "left",
          "lineHeight": "0rem",
          }}
        > Riff </h2>
      </div>
      <div className="root-loginForm-Login">
        <form onSubmit={handleLogin} className="loginForm-Login"> {/* Fixed function name */}
          <h1 className="login-text-Login"> 
            Login to the 
            <br /> 
            <span className="riffSpan-Login">Riff</span> 
            <br />
            Experience 
          </h1>

          <p className="username-text-Login"> Enter Username </p>
          <input className="user-text"
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <p className="password-text-Login"> Enter Password </p>
          <input className='password-text'
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <div className="button-container-Login">
            {formError()}
          </div>
          <Link to="/register">
            <p className="link-register-Login"> No account? Register here! </p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
