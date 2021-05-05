import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ResetPassword.css";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 3000);
      return setError("Passwords didn't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/reset-password/${match.params.resetToken}`,
        { password },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="resetpassword">
      <form onSubmit={handleSubmit} className="resetpassword__form">
        <h3 className="resetpassword__title">Forgot Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">Enter New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
