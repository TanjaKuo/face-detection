import React from "react";

import "./navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => onRouteChange("signout")}
          /* className="f3 link dim black underline pa3 pointer" */
          className="sign-out-btn"
        >
          |
        </button>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <p onClick={() => onRouteChange("signin")} className="nav-name">
          Sign In
        </p>
        <p onClick={() => onRouteChange("register")} className="nav-name">
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
