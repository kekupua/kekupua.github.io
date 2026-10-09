import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import { LearnApp } from "./App";
import "./learn.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<LearnApp />} />
      <Route path="/:category" element={<LearnApp />} />
      <Route path="/:category/:mode" element={<LearnApp />} />
      <Route path="*" element={<LearnApp />} />
    </Routes>
  </HashRouter>,
);
