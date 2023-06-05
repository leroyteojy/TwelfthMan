const express = require("express");

const app = express();
const port = 8080; // Choose any available port number

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/standings", async (req, res) => {
  const league = req.query.league;
  let url = "";

  // Check the league parameter and set the appropriate API endpoint
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
  } 

  // Add more conditions for other leagues if needed
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

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
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