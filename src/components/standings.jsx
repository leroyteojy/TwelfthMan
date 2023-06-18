import React, { useEffect, useState } from "react";
import "./../league-table.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import Campeonato_Brasileiro_Serie_A_logo from ".//..//images//Campeonato_Brasileiro_Serie_A_logo.webp";
import { Link, useLocation } from "react-router-dom";

function StandingsPage() {
  const location = useLocation();
  const [league, setLeague] = useState("pl");
  const [standingsData, setStandingsData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const leagueParam = urlParams.get("league");

    if (leagueParam) {
      setLeague(leagueParam);
      loadStandings(leagueParam, selectedSeason);
    }
  }, [location.search]);

  const loadStandings = (league, season) => {
    setLoading(true);
    setTimeout(() => {
      fetch(
        `https://damp-bayou-37411.herokuapp.com/standings?league=${league}&season=${season}`
      )
        .then((response) => response.json())
        .then((data) => {
          setStandingsData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1000);
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
    } else if (league === "campeonatobrasileiroseriea") {
      if (position >= 1 && position <= 4) {
        label = "copa-libertadores";
      } else if (position >= 5 && position <= 6) {
        label = "copa-sudamericana";
      } else if (position >= 7 && position <= 12) {
        label = "copa-libertadores-qual";
      } else if (position >= 17 && position <= 20) {
        label = "relegation";
      }
    } else if (league === "primeiraliga") {
      if (position >= 1 && position <= 2) {
        label = "champions-league";
      } else if (position === 3) {
        label = "champions-league-qual";
      } else if (position >= 4 && position <= 5) {
        label = "europa-conf-league-qual";
      } else if (position === 16) {
        label = "relegation-qual";
      } else if (position >= 17 && position <= 18) {
        label = "relegation";
      }
    } else if (league === "eredivisie") {
      if (position === 1) {
        label = "champions-league";
      } else if (position === 2) {
        label = "champions-league-qual";
      } else if (position === 3) {
        label = "europa-league";
      } else if (position === 4) {
        label = "europa-conf-league-qual";
      } else if (position >= 5 && position <= 8) {
        label = "europa-conf-league-playoff";
      } else if (position === 16) {
        label = "relegation-qual";
      } else if (position >= 17 && position <= 18) {
        label = "relegation";
      }
    }

    return label;
  };

  const renderSeasonDropdown = () => {
    const seasons = ["2020", "2021", "2022", "2023"]; // Replace with your desired list of seasons

    const handleSeasonChange = (event) => {
      const selectedSeason = event.target.value;
      setSelectedSeason(selectedSeason);
      loadStandings(league, selectedSeason); // Use selectedSeason state variable
    };
    return (
      <div className="season-dropdown">
        <select value={selectedSeason} onChange={handleSeasonChange} style={{ fontSize: '22px'}}>
          <option value="">Select Season</option>
          {seasons.map((season, index) => (
            <option value={season} key={season}>
              {season}/{parseInt(season) + 1}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderTable = () => {
    if (loading) {
      return <div>Loading League Table...</div>; // Render loading state if still loading
    }
    if (
      !standingsData ||
      !standingsData.competition ||
      !standingsData.filters
    ) {
      return (
        <div>
          <div style={{ fontSize: '24px', textAlign: 'center' }}>
          Season data not available yet! <br/><br/>
          Choose another season!</div>
          <br></br>
          {renderSeasonDropdown()}
        </div>
      );      
    }
    if (standingsData) {
      const leagueName = standingsData.competition.name;
      const seasonYear = standingsData.filters.season.slice(2);
      const seasonNumber = `${seasonYear}/${Number(seasonYear) + 1}`;
      const leagueEmblem = standingsData.competition.emblem;
      const headerText = (
        <div className="header-text">
          {leagueName === "Campeonato Brasileiro Série A" ? (
            <img
              src={Campeonato_Brasileiro_Serie_A_logo}
              alt={`${leagueName} Emblem`}
              className="league-emblem"
            />
          ) : (
            <img
              src={leagueEmblem}
              alt={`${leagueName} Emblem`}
              className="league-emblem"
            />
          )}
          <span>Season {seasonNumber} Standings&nbsp;&nbsp;&nbsp;</span>
          {renderSeasonDropdown()}
        </div>
      );

      let zoneLabels;

      if (leagueName === "Campeonato Brasileiro Série A") {
        zoneLabels = [
          { className: "copa-libertadores", description: "Copa Libertadores" },
          { className: "copa-sudamericana", description: "Copa Sudamericana" },
          {
            className: "copa-libertadores-qual",
            description: "Copa Libertadores Qualification",
          },
          { className: "relegation", description: "Relegation" },
        ];
      } else {
        zoneLabels = [
          { className: "champions-league", description: "Champions League" },
          {
            className: "champions-league-qual",
            description: "Champions League Qualification",
          },
          { className: "europa-league", description: "Europa League" },
          {
            className: "europa-conf-league-qual",
            description: "Europa Conference League Qualification",
          },
          {
            className: "europa-conf-league-playoff",
            description: "Europa Conference League Play-Off",
          },
          {
            className: "relegation-qual",
            description: "Relegation Qualification",
          },
          { className: "relegation", description: "Relegation" },
        ];
      }

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
                <Link to="/predictions">Predictions</Link>
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
                  <li>
                    <Link to="/standings?league=primeiraliga">
                      Primeira Liga
                    </Link>
                  </li>
                  <li>
                    <Link to="/standings?league=eredivisie">Eredivisie</Link>
                  </li>
                  <li>
                    <Link to="/standings?league=campeonatobrasileiroseriea">
                      Campeonato Brasileiro Série A
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="center">{renderTable()}</div>
      </div>
    </div>
  );
}

export default StandingsPage;
