import React, { useEffect, useState } from "react";
import "./../league-table.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import { Link, useLocation } from "react-router-dom";

function StandingsPage() {
  const location = useLocation();
  const [league, setLeague] = useState("pl");
  const [standingsData, setStandingsData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const leagueParam = urlParams.get("league");

    if (leagueParam) {
      setLeague(leagueParam);
      loadStandings(leagueParam);
    }
  }, [location.search]);

  const loadStandings = (league) => {
    fetch(`http://localhost:8080/standings?league=${league}`)
      .then((response) => response.json())
      .then((data) => {
        setStandingsData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createTableRows = (datas, league) => {
    return datas.map((teamData) => {
      // Create and populate the cells for each team's data
      const zones = getPositionClassName(teamData.position, league);
      const positionCell = <td className={zones}>{teamData.position}</td>;

      const teamCell = (
        <td>
          <img
            src={teamData.team.crest}
            alt={teamData.team.name}
            className="crest-image"
          />
          {teamData.team.name}
        </td>
      );

      const playedGamesCell = <td>{teamData.playedGames}</td>;
      const winsCell = <td>{teamData.won}</td>;
      const drawsCell = <td>{teamData.draw}</td>;
      const lossesCell = <td>{teamData.lost}</td>;
      const goalforCell = <td>{teamData.goalsFor}</td>;
      const goalagainstCell = <td>{teamData.goalsAgainst}</td>;
      const goaldiffCell = <td>{teamData.goalDifference}</td>;
      const pointsCell = <td>{teamData.points}</td>;

      return (
        <tr key={teamData.team.id}>
          {positionCell}
          {teamCell}
          {playedGamesCell}
          {winsCell}
          {drawsCell}
          {lossesCell}
          {goalforCell}
          {goalagainstCell}
          {goaldiffCell}
          {pointsCell}
        </tr>
      );
    });
  };

  const getPositionClassName = (position, league) => {
    let label = "";
    if (league === "pl") {
      if (position >= 1 && position <= 4) {
        label = "champions-league";
      } else if (position >= 5 && position <= 6) {
        label = "europa-league";
      } else if (position === 7) {
        label = "europa-conf-league-qual";
      } else if (position >= 18 && position <= 20) {
        label = "relegation";
      }
    } else if (league === "bundesliga") {
      if (position >= 1 && position <= 4) {
        label = "champions-league";
      } else if (position === 5) {
        label = "europa-league";
      } else if (position === 6) {
        label = "europa-conf-league-qual";
      } else if (position === 16) {
        label = "relegation-qual";
      } else if (position >= 17 && position <= 18) {
        label = "relegation";
      }
    } else if (league === "primeradivision") {
      if (position >= 1 && position <= 4) {
        label = "champions-league";
      } else if (position >= 5 && position <= 6) {
        label = "europa-league";
      } else if (position === 7) {
        label = "europa-conf-league-qual";
      } else if (position >= 18 && position <= 20) {
        label = "relegation";
      }
    } else if (league === "seriea") {
      if (position >= 1 && position <= 4) {
        label = "champions-league";
      } else if (position >= 5 && position <= 6) {
        label = "europa-league";
      } else if (position === 7) {
        label = "europa-conf-league-qual";
      } else if (position >= 18 && position <= 20) {
        label = "relegation";
      }
    } else if (league === "ligue1") {
      if (position >= 1 && position <= 2) {
        label = "champions-league";
      } else if (position === 3) {
        label = "champions-league-qual";
      } else if (position === 4) {
        label = "europa-league";
      } else if (position === 5) {
        label = "europa-conf-league-qual";
      } else if (position >= 17 && position <= 20) {
        label = "relegation";
      }
    }

    return label;
  };

  const renderTable = () => {
    if (standingsData) {
      const leagueName = standingsData.competition.name;
      const seasonYear = standingsData.filters.season.slice(2);
      const seasonNumber = `${seasonYear}/${Number(seasonYear) + 1}`;
      const headerText = `${leagueName} - Season ${seasonNumber} Standings`;

      const zoneLabels = [
        { className: "champions-league", description: "Champions League" },
        {
          className: "champions-league-qual",
          description: "Champions League Qualification",
        },
        { className: "europa-league", description: "Europa League" },
        {
          className: "europa-conf-league-qual",
          description: "Europa League Qualification",
        },
        {
          className: "relegation-qual",
          description: "Relegation Qualification",
        },
        { className: "relegation", description: "Relegation" },
      ];

      return (
        <div>
          <h2 className="league-table">{headerText}</h2>
          <table id="standings-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Losses</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {createTableRows(standingsData.standings[0].table, league)}
            </tbody>
          </table>
          <div id="zone-labels">
            <ul>
              {zoneLabels.map((label, index) => (
                <li key={index}>
                  <span
                    className={`dot ${label.className}`}
                    title={label.description}
                  ></span>
                  <span>{label.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="league-table-container">
      <div id="header">
        <div className="container">
          <nav>
            <img src={TwelfthManLogo} alt="TwelfthManLogo" />
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/prediction">Predictions</Link>
              </li>
              <li>
                <Link to="/fixtures">Fixtures</Link>
              </li>
              <li className="dropdown1">
                <Link to="#" className="dropdown1-toggle">
                  League Tables
                </Link>
                <ul className="dropdown1-menu">
                  <li>
                    <Link to="/standings?league=pl">Premier League</Link>
                  </li>
                  <li>
                    <Link to="/standings?league=bundesliga">Bundesliga</Link>
                  </li>
                  <li>
                    <Link to="/standings?league=primeradivision">
                      Primera Division
                    </Link>
                  </li>
                  <li>
                    <Link to="/standings?league=seriea">Serie A</Link>
                  </li>
                  <li>
                    <Link to="/standings?league=ligue1">Ligue 1</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div class="center">{renderTable()}</div>
      </div>
    </div>
  );
}

export default StandingsPage;
