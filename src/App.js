import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpeningPage from "./components/opening-page.jsx";
import StandingsPage from "./components/standings.jsx";
import FixturesPage from "./components/fixtures.jsx";
import PredictionPage from "./components/prediction.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/predictions" element={<PredictionPage />} />
      </Routes>
    </div>
  );
}

export default App;
