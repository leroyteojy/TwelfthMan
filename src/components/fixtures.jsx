import React, { useEffect, useState } from "react";
import "./../fixtures.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import { Link } from "react-router-dom";
import PastFixtures from "./past-fixtures";

function FixturesPage() {
  const [fixturesData, setFixturesData] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("All Competitions");

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
      const competition = fixture.competition;
      const dateTime = new Date(fixture.utcDate).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      const [date, time] = dateTime.split(",");
      const splitdate = date.split("/");
      const newDate = splitdate[1] + "/" + splitdate[0] + "/" + splitdate[2];

      const score =
        fixture.status === "FINISHED" ? (
          `${fixture.score.fullTime.home} - ${fixture.score.fullTime.away}`
        ) : (
          <div>
            Match Scheduled <br />
            To Begin
          </div>
        );
      const league = fixture.competition.name;

      return (
        <tr key={fixture.id}>
          <td>
            <img
              src={fixture.competition.emblem}
              alt={`${competition} Crest`}
            />
            {league}
          </td>
          <td>
            <img src={fixture.homeTeam.crest} alt={`${homeTeam} Crest`} />
            {homeTeam}
          </td>
          <td>
            <img src={fixture.awayTeam.crest} alt={`${awayTeam} Crest`} />
            {awayTeam}
          </td>
          <td>
            <div>
              <div>{newDate}</div>
              <br></br>
              <div>{time}</div>
            </div>
          </td>
          <td>{score}</td>
        </tr>
      );
    });
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  const filterFixturesByLeague = (fixtures) => {
    if (selectedLeague === "All Competitions") {
      return fixtures;
    }
    return fixtures.filter(
      (fixture) => fixture.competition.name === selectedLeague
    );
  };

  const renderLeagueOptions = () => {
    const leagues = [
      "All Competitions",
      "Premier League",
      "Bundesliga",
      "Primera Division",
      "Serie A",
      "Ligue 1",
      "Primeira Liga",
      "Eredivisie",
      "Campeonato Brasileiro Série A",
      "Copa Libertadores",
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
    const headerText = "Upcoming Fixtures";
    const filteredFixtures = filterFixturesByLeague(
      fixturesData ? fixturesData.matches : []
    );

    return (
      <div>
        <div className="league-filter">
          <label htmlFor="league-select">Filter by competition: </label>
          <select
            id="league-select"
            value={selectedLeague}
            onChange={handleLeagueChange}
          >
            {renderLeagueOptions()}
          </select>
        </div>
        <h2 className="fixtures-table">{headerText}</h2>
        {fixturesData ? (
          filteredFixtures.length === 0 ? (
            <div>There are currently no matches scheduled!</div>
          ) : (
            <table id="fixtures-table">
              <thead>
                <tr className="table-header-row">
                  <th>Competition</th>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th>Date & Time (GMT+8)</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{createFixtureRows(filteredFixtures)}</tbody>
            </table>
          )
        ) : (
          <div>Loading fixtures...</div>
        )}
      </div>
    );
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
        <div className="center">
          <div className="table-container">{renderTable()}</div>
          <div className="section-divider"></div>
          <PastFixtures />
        </div>
      </div>
    </div>
  );
}

export default FixturesPage;
