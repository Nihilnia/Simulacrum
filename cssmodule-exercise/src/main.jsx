import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'

import POne from "./PageOne/POne.jsx";
import PTwo from "./PageTwo/PTwo.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/POne" element={<POne />} />
      <Route path="/PTwo" element={<PTwo />} />
    </Routes>
  </BrowserRouter>
);
