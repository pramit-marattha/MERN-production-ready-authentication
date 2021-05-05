import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// styling
import "./Login.css";

const Login = ({ history }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    // if (password !== confirmpassword) {
    //   setPassword("");
    //   setConfirmpassword("");
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    //   return setError("Password Did not matched");
    // }
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit} className="login__form">
          <h3 className="login__title">Login form</h3>
          {error && <span className="error-message">{error}</span>}

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              tabIndex={1}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              tabIndex={2}
            />
            <span className="login__bottomtext" tabIndex={3}>
              <Link to="/forgot-password">Forgot Password ?.</Link>
            </span>
          </div>

          <button type="submit" className="btn btn-primary" tabIndex={4}>
            Login
          </button>

          <span className="login__bottomtext" tabIndex={5}>
            <Link to="/register">I don't Have an account.</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
