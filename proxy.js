const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/standings", async (req, res) => {
  const leagues = {
    pl: "PL",
    bundesliga: "BL1",
    primeradivision: "PD",
    seriea: "SA",
    ligue1: "FL1",
    campeonatobrasileiroseriea: "BSA",
    primeiraliga: "PPL",
    eredivisie: "DED",
  };

  const league = req.query.league;
  const season = req.query.season || "2022";
  const url = `http://api.football-data.org/v4/competitions/${leagues[league]}/standings?season=${season}`;
  const headers = {
    "X-Auth-Token": "da0d2ae1e2de4f098cc873f90083f408",
  };

  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/fixtures", async (req, res) => {
  const headers = {
    "X-Auth-Token": "da0d2ae1e2de4f098cc873f90083f408",
  };

  try {
    const response = await fetch("http://api.football-data.org/v4/matches", {
      headers,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/past-fixtures", async (req, res) => {
  const leagues = {
    pl: "PL",
    bundesliga: "BL1",
    primeradivision: "PD",
    seriea: "SA",
    ligue1: "FL1",
    campeonatobrasileiroseriea: "BSA",
    primeiraliga: "PPL",
    eredivisie: "DED",
  };

  const league = req.query.league;
  const season = req.query.season || "2022";
  const url = `http://api.football-data.org/v4/competitions/${leagues[league]}/matches?season=${season}`;
  const headers = {
    "X-Auth-Token": "da0d2ae1e2de4f098cc873f90083f408",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
