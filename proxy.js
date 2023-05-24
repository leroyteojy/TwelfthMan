const express = require("express");

const app = express();
const port = 3000; // Choose any available port number

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/standings/:league", async (req, res) => {
  const league = req.params.league;
  let url = "";

  // Check the league parameter and set the appropriate API endpoint
  if (league === "pl") {
    url = "http://api.football-data.org/v4/competitions/PL/standings";
  } else if (league === "bundesliga") {
    url = "http://api.football-data.org/v4/competitions/BL1/standings";
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
