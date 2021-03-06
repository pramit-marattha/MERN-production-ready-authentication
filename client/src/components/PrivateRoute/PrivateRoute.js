import React, { useState, useEffect } from "react";
import axios from "axios";

import Landing from "../Landing";

const PrivateRoute = ({ history }) => {
  const [error, setError] = useState("");
  const [privateInfo, setPrivateInfo] = useState("");

  useEffect(() => {
    const fetchingPrivateInfos = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private-route", config);
        setPrivateInfo(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Authorization Invoked please login to continue");
      }
    };

    fetchingPrivateInfos();
  }, [history]);

  const favicon = document.getElementById("favicon");
  favicon.href = "https://twemoji.maxcdn.com/2/svg/1f513.svg";

  const handleOnClick = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      {/* <div style={{ background: "green", color: "white" }}>{privateInfo}</div> */}
      <Landing privateInfo={privateInfo} handleOnClick={handleOnClick} />
      {/* <button onClick={handleOnClick}>Logout</button> */}
    </>
  );
};

export default PrivateRoute;
