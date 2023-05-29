import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import DenemeP from "./Deneme/DenemeP.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Deneme" element={<DenemeP />} />
    </Routes>
  </BrowserRouter>
);
