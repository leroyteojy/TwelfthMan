const express = require("express");
const fetch = require("cross-fetch");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "https://twelfth-man-dbad2.web.app",
  })
);

app.use("/standings", async (req, res) => {
  const league = req.query.league;
  let url = "";

  if (league === "pl") {
    url = "http://api.football-data.org/v4/competitions/PL/standings";
  } else if (league === "bundesliga") {
    url = "http://api.football-data.org/v4/competitions/BL1/standings";
  } else if (league === "primeradivision") {
    url = "http://api.football-data.org/v4/competitions/PD/standings";
  } else if (league === "seriea") {
    url = "http://api.football-data.org/v4/competitions/SA/standings";
  } else if (league === "ligue1") {
    url = "http://api.football-data.org/v4/competitions/FL1/standings";
  } else if (league === "campeonatobrasileiroseriea") {
    url = "http://api.football-data.org/v4/competitions/BSA/standings";
  } else if (league === "primeiraliga") {
    url = "http://api.football-data.org/v4/competitions/PPL/standings";
  } else if (league === "eredivisie") {
    url = "http://api.football-data.org/v4/competitions/DED/standings";
  }

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});