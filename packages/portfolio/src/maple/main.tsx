import { registerPortfolioPwa } from "../pwa/register";
import React from "react";
import { createRoot } from "react-dom/client";
import { MapleApp } from "./MapleApp";
import "./maple.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MapleApp />
  </React.StrictMode>,
);

void registerPortfolioPwa();
