import React from "react";
import { createRoot } from "react-dom/client";
import { MortgageApp } from "./MortgageApp";
import "./mortgage.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MortgageApp />
  </React.StrictMode>,
);
