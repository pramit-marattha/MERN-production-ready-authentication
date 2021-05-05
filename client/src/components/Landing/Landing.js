import React from "react";
import "./Landing.css";

const Landing = ({ privateInfo, handleOnClick }) => {
  return (
    <>
      <ul className="header">
        <li>
          <a
            style={{ float: "right", background: "red", cursor: "pointer" }}
            onClick={handleOnClick}
          >
            Logout
          </a>
        </li>
        <li>
          <a>Home</a>
        </li>
      </ul>
      <h1 style={{ textAlign: "center" }}>{privateInfo}</h1>

      <div className="content">
        <h2>You can only access this page after authentication</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna
          justo, lacinia eget consectetur sed, convallis at tellus. Vivamus
          magna justo, lacinia eget consectetur sed, convallis at tellus. Proin
          eget tortor risus. Quisque velit nisi, pretium ut lacinia in,
          elementum id enim. Curabitur arcu erat, accumsan id imperdiet et,
          porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum
          sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Sed
          porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Proin eget
          tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id
          enim. Vivamus magna justo, lacinia eget consectetur sed, convallis at
          tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur
          aliquet quam id dui posuere blandit. Donec sollicitudin molestie
          malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec rutrum congue leo eget malesuada.
        </p>
      </div>
    </>
  );
};

export default Landing;
