import React, { useEffect, useState } from "react";

function PastFixtures() {
  const [pastFixtures, setPastFixtures] = useState([]);
  const [season, setSeason] = useState("2021");
  const [league, setLeague] = useState("pl");

  const seasons = ["2021", "2022"];

  const leagues = [
    { name: "Premier League", code: "pl" },
    { name: "La Liga", code: "primeradivision" },
    { name: "Bundesliga", code: "bundesliga" },
    { name: "Serie A", code: "seriea" },
    { name: "Ligue 1", code: "ligue1" },
    { name: "Primeira Liga", code: "premeiraliga" },
    { name: "Eredivisie", code: "eredivise" },
    {
      name: "Campeonato Brasileiro Série A",
      code: "campeonatobrasileiroseriea",
    },
  ];

  useEffect(() => {
    const fetchPastFixtures = async () => {
      const response = await fetch(
        `http://localhost:8080/past-fixtures?league=${league}&season=${season}`
      );
      const data = await response.json();
      setPastFixtures(data.matches);
    };
    fetchPastFixtures();
  }, [league, season]);

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  const createFixtureRows = (fixtures) => {
    return fixtures.map((fixture) => {
      const homeTeam = fixture.homeTeam.name;
      const awayTeam = fixture.awayTeam.name;
      const competition = fixture.competition.name;
      const dateTime = new Date(fixture.utcDate).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const [date, time] = dateTime.split(",");
      const splitdate = date.split("/");
      const newDate = splitdate[1] + "/" + splitdate[0] + "/" + splitdate[2];

      const score = `${fixture.score.fullTime.home} - ${fixture.score.fullTime.away}`;
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
              <div>{time}</div>
            </div>
          </td>
          <td>{score}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2 className="fixtures-table">Past Fixtures</h2>

      <div className="dropdown-container">
        <label htmlFor="season-dropdown">Select Season:</label>
        <select
          id="season-dropdown"
          value={season}
          onChange={handleSeasonChange}
        >
          {seasons.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="league-dropdown">Select League:</label>
        <select
          id="league-dropdown"
          value={league}
          onChange={handleLeagueChange}
        >
          {leagues.map((league) => (
            <option key={league.code} value={league.code}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      <table id="past-fixtures-table">
        <thead>
          <tr className="table-header-row">
            <th>Competition</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Date & Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{createFixtureRows(pastFixtures)}</tbody>
      </table>
    </div>
  );
}

export default PastFixtures;
