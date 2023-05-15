import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";
import { useContext } from "react";
import './Header.css'

function Header() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="header-container">
      <h2>Paddle Pals</h2>
      <nav className="nav">
        {authCtx.token ? (
          <ul>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/add">Add</NavLink>
              <button
                onClick={() => {
                  authCtx.logout();
                }}
              >
                Logout
              </button>
          </ul>
        ) : (
          <ul>
              <NavLink to="/">Home</NavLink>{" "}
              <NavLink to="auth">Register or Login</NavLink>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Header;
