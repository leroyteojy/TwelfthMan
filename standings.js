// Retrieve the league from the query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const league = urlParams.get("league");

// Set the default league to Premier League
let defaultLeague = "pl";

if (league === "bundesliga") {
  defaultLeague = "bundesliga";
} else if (league === "primeradivision") {
  defaultLeague = "primeradivision";
} else if (league === "seriea") {
  defaultLeague = "seriea";
} else if (league === "ligue1") {
  defaultLeague = "ligue1";
}

// Call the loadStandings function with the default league
loadStandings(defaultLeague);

function loadStandings(league) {
  fetch(`http://localhost:3000/standings/${league}`)
    .then((response) => response.json())
    .then((data) => {
      const leagueName = data["competition"]["name"];
      const seasonYear = data["filters"]["season"].slice(2);
      const seasonNumber = `${seasonYear}/${(
        Number(seasonYear) + 1
      ).toString()}`;
      const headerElement = document.querySelector("#league-header");
      headerElement.textContent = `${leagueName} - Season ${seasonNumber} Standings`;

      const datas = data["standings"][0]["table"];
      createTableRows(datas, league);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

function createTableRows(datas, league) {
  const tbody = document.querySelector("#standings-table tbody");
  const zoneLabels = document.querySelector("#zone-labels");

  tbody.innerHTML = "";
  zoneLabels.innerHTML = "";

  // Loop through the standings data and create a table row for each team
  datas.forEach((teamData) => {
    const row = document.createElement("tr");

    // Create and populate the cells for each team's data
    const positionCell = document.createElement("td");
    const zoneLabel = document.createElement("li");
    positionCell.textContent = teamData.position;

    if (league == "pl") {
      if (teamData.position >= 1 && teamData.position <= 4) {
        positionCell.classList.add("champions-league");
        applyDotClass("champions-league", "Champions League");
      } else if (teamData.position >= 5 && teamData.position <= 6) {
        positionCell.classList.add("europa-league");
        applyDotClass("europa-league", "Europa League");
      } else if (teamData.position === 7) {
        positionCell.classList.add("europa-conf-league-qual");
        applyDotClass(
          "europa-conf-league-qual",
          "Europa Conference League Qualification"
        );
      } else if (teamData.position >= 18 && teamData.position <= 20) {
        positionCell.classList.add("relegation");
        applyDotClass("relegation", "Relegation");
      }
    } else if (league == "bundesliga") {
      if (teamData.position >= 1 && teamData.position <= 4) {
        positionCell.classList.add("champions-league");
        applyDotClass("champions-league", "Champions League");
      } else if (teamData.position === 5) {
        positionCell.classList.add("europa-league");
        applyDotClass("europa-league", "Europa League");
      } else if (teamData.position === 6) {
        positionCell.classList.add("europa-conf-league-qual");
        applyDotClass(
          "europa-conf-league-qual",
          "Europa Conference League Qualification"
        );
      } else if (teamData.position === 16) {
        positionCell.classList.add("relegation-qual");
        applyDotClass("relegation-qual", "Relegation Qualification");
      } else if (teamData.position >= 17 && teamData.position <= 18) {
        positionCell.classList.add("relegation");
        applyDotClass("relegation", "Relegation");
      }
    } else if (league == "primeradivision") {
      if (teamData.position >= 1 && teamData.position <= 4) {
        positionCell.classList.add("champions-league");
        applyDotClass("champions-league", "Champions League");
      } else if (teamData.position >= 5 && teamData.position <= 6) {
        positionCell.classList.add("europa-league");
        applyDotClass("europa-league", "Europa League");
      } else if (teamData.position === 7) {
        positionCell.classList.add("europa-conf-league-qual");
        applyDotClass(
          "europa-conf-league-qual",
          "Europa Conference League Qualification"
        );
      } else if (teamData.position >= 18 && teamData.position <= 20) {
        positionCell.classList.add("relegation");
        applyDotClass("relegation", "Relegation");
      }
    } else if (league == "seriea") {
      if (teamData.position >= 1 && teamData.position <= 4) {
        positionCell.classList.add("champions-league");
        applyDotClass("champions-league", "Champions League");
      } else if (teamData.position >= 5 && teamData.position <= 6) {
        positionCell.classList.add("europa-league");
        applyDotClass("europa-league", "Europa League");
      } else if (teamData.position === 7) {
        positionCell.classList.add("europa-conf-league-qual");
        applyDotClass(
          "europa-conf-league-qual",
          "Europa Conference League Qualification"
        );
      } else if (teamData.position >= 18 && teamData.position <= 20) {
        positionCell.classList.add("relegation");
        applyDotClass("relegation", "Relegation");
      }
    } else if (league == "ligue1") {
      if (teamData.position >= 1 && teamData.position <= 2) {
        positionCell.classList.add("champions-league");
        applyDotClass("champions-league", "Champions League");
      } else if (teamData.position === 3) {
        positionCell.classList.add("champions-league-qual");
        applyDotClass(
          "champions-league-qual",
          "Champions League Qualification"
        );
      } else if (teamData.position === 4) {
        positionCell.classList.add("europa-league");
        applyDotClass("europa-league", "Europa League");
      } else if (teamData.position === 5) {
        positionCell.classList.add("europa-conf-league-qual");
        applyDotClass(
          "europa-conf-league-qual",
          "Europa Conference League Qualification"
        );
      } else if (teamData.position >= 17 && teamData.position <= 20) {
        positionCell.classList.add("relegation");
        applyDotClass("relegation", "Relegation");
      }
    }

    zoneLabels.appendChild(zoneLabel);
    row.appendChild(positionCell);

    const teamCell = document.createElement("td");
    const image = document.createElement("img");
    image.src = teamData.team.crest;
    image.classList.add("crest-image");
    teamCell.textContent = teamData.team.name;
    teamCell.appendChild(image);
    row.appendChild(teamCell);

    const playedGamesCell = document.createElement("td");
    playedGamesCell.textContent = teamData.playedGames;
    row.appendChild(playedGamesCell);

    const winsCell = document.createElement("td");
    winsCell.textContent = teamData.won;
    row.appendChild(winsCell);

    const drawsCell = document.createElement("td");
    drawsCell.textContent = teamData.draw;
    row.appendChild(drawsCell);

    const lossesCell = document.createElement("td");
    lossesCell.textContent = teamData.lost;
    row.appendChild(lossesCell);

    const goalforCell = document.createElement("td");
    goalforCell.textContent = teamData.goalsFor;
    row.appendChild(goalforCell);

    const goalagainstCell = document.createElement("td");
    goalagainstCell.textContent = teamData.goalsAgainst;
    row.appendChild(goalagainstCell);

    const goaldiffCell = document.createElement("td");
    goaldiffCell.textContent = teamData.goalDifference;
    row.appendChild(goaldiffCell);

    const pointsCell = document.createElement("td");
    pointsCell.textContent = teamData.points;
    row.appendChild(pointsCell);

    // Append the row to the table body
    tbody.appendChild(row);
  });
}

function applyDotClass(className, description) {
  const zoneLabels = document.querySelector("#zone-labels");

  // Check if a dot with the given class already exists
  const existingDot = zoneLabels.querySelector(`.${className}`);
  if (existingDot) {
    return; // Skip creating the dot if it already exists
  }

  const zoneLabel = document.createElement("li");
  const dotSpan = document.createElement("span");
  dotSpan.classList.add("dot", className);
  zoneLabel.appendChild(dotSpan);

  const descriptionSpan = document.createElement("span");
  descriptionSpan.textContent = description;
  zoneLabel.appendChild(descriptionSpan);
  zoneLabels.appendChild(zoneLabel);
}
