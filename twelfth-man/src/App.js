import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpeningPage from "./components/opening-page.jsx";
import StandingsPage from "./components/standings.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/standings" element={<StandingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
