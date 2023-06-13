import 'tailwindcss/tailwind.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
      <div className="app-wrapper">
        <App />
      </div>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
