import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// styling
import "./Register.css";

const Register = ({ history }) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

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
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmpassword("");
      setTimeout(() => {
        setError("");
      }, 3000);
      return setError("Password Did not matched");
    }
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
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
      <div className="register">
        <form onSubmit={handleSubmit} className="register__form">
          <h3 className="register__title">Registartion form</h3>
          {error && <span className="error-message">{error}</span>}

          {/* Username */}
          <div className="form-group">
            <label htmlFor="name">Username: </label>
            <input
              type="text"
              required
              id="name"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

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
            />
          </div>

          {/* Password confirmation */}
          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password: </label>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(event) => setConfirmpassword(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <span className="register__bottomtext">
            <Link to="/login">I Have an account.</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;
