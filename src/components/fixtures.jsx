import React, { useEffect, useState } from "react";
import "./../fixtures.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import { Link } from "react-router-dom";

function FixturesPage() {
  const [fixturesData, setFixturesData] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("all");

  useEffect(() => {
    loadFixtures();
  }, []);

  const loadFixtures = () => {
    fetch("https://damp-bayou-37411.herokuapp.com/fixtures")
      .then((response) => response.json())
      .then((data) => {
        setFixturesData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createFixtureRows = (fixtures) => {
    return fixtures.map((fixture) => {
      const homeTeam = fixture.homeTeam.name;
      const awayTeam = fixture.awayTeam.name;
      const homeTeamCrest = fixture.homeTeam.crestUrl;
      const awayTeamCrest = fixture.awayTeam.crestUrl;
      const date = new Date(fixture.utcDate).toLocaleString();
      const score =
        fixture.status === "FINISHED"
          ? `${fixture.score.fullTime.home} - ${fixture.score.fullTime.away}`
          : "-";
      const league = fixture.competition.name;

      return (
        <tr key={fixture.id}>
          <td>
            <img src={fixture.homeTeam.crest} alt={`${homeTeam} Crest`} />
            {homeTeam}
          </td>
          <td>
            <img src={fixture.awayTeam.crest} alt={`${awayTeam} Crest`} />
            {awayTeam}
          </td>
          <td>{date}</td>
          <td>{score}</td>
          <td>{league}</td>
        </tr>
      );
    });
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  const filterFixturesByLeague = (fixtures) => {
    if (selectedLeague === "all") {
      return fixtures;
    }
    return fixtures.filter(
      (fixture) => fixture.competition.name === selectedLeague
    );
  };

  const renderLeagueOptions = () => {
    const leagues = [
      "All Leagues",
      "Premier League",
      "Bundesliga",
      "Primera Division",
      "Serie A",
      "Ligue 1",
      "Campeonato Brasileiro Série A",
    ];

    return leagues.map((league) => {
      return (
        <option key={league} value={league}>
          {league}
        </option>
      );
    });
  };

  const renderTable = () => {
    if (fixturesData) {
      const headerText = "Upcoming Fixtures";
      const filteredFixtures = filterFixturesByLeague(fixturesData.matches);

      return (
        <div>
          <div className="league-filter">
            <label htmlFor="league-select">Filter by league: </label>
            <select
              id="league-select"
              value={selectedLeague}
              onChange={handleLeagueChange}
            >
              {renderLeagueOptions()}
            </select>
          </div>
          <h2 className="fixtures-table">{headerText}</h2>
          <table id="fixtures-table">
            <thead>
              <tr>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Date</th>
                <th>Score</th>
                <th>League</th>
              </tr>
            </thead>
            <tbody>{createFixtureRows(filteredFixtures)}</tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixtures-container">
      <div id="header" className="fixtures-header-container">
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

export default FixturesPage;
