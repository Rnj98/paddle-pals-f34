import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";
import { useContext } from "react";
import './Header.css'

function Header() {
  const authCtx = useContext(AuthContext);
  return (
    <header>
      <h2 className="text-white">Paddle Pals</h2>
      <nav className="text-white">
        {authCtx.token ? (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  authCtx.logout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            <li>
              <NavLink to="auth">Register or Login</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}


export default Header;
