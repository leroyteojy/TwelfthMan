import React, { useEffect, useState } from "react";

function PastFixtures() {
  const [pastFixtures, setPastFixtures] = useState([]);
  const [season, setSeason] = useState("2022");
  const [league, setLeague] = useState("pl");
  const [isLoading, setIsLoading] = useState(true);

  const seasons = ["2021", "2022", "2023"];

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
      setIsLoading(true);
      const response = await fetch(
        `https://damp-bayou-37411.herokuapp.com/past-fixtures?league=${league}&season=${season}`
      );
      const data = await response.json();
      setPastFixtures(data.matches);
      setIsLoading(false);
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
    if (!fixtures || fixtures.length === 0) {
      return (
        <tr>
          <td colSpan="5">No Fixtures Available</td>
        </tr>
      );
    }
    return fixtures.reverse().map((fixture) => {
      const homeTeam = fixture.homeTeam.name;
      const awayTeam = fixture.awayTeam.name;
      const competition = fixture.competition.name;
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
          <div> Match Scheduled </div>
        );
      const league = fixture.competition.name;

      return (
        <tr key={fixture.id}>
          <td>
            <img
              src={fixture.competition.emblem}
              alt={`${competition} Crest`}
              style={{ width: "50px", height: "50px" }}
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="fixtures-table">Past Fixtures</h2>

      <div className="dropdown-container1">
        <label htmlFor="season-dropdown">Select Season:</label>
        <select
          id="season-dropdown"
          value={season}
          onChange={handleSeasonChange}
        >
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}/{Number(season) + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-container2">
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

      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {pastFixtures && pastFixtures.length > 0 ? (
            <table id="past-fixtures-table">
              <thead>
                <tr className="table-header-row">
                  <th>Competition</th>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th>Date & Time (GMT+8)</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{createFixtureRows(pastFixtures)}</tbody>
            </table>
          ) : (
            <p>Oops! There are currently no fixtures available</p>
          )}
        </>
      )}
    </div>
  );
}

export default PastFixtures;
