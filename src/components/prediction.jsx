import React, { useState, useEffect } from "react";
import "./../predictions.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import PremierLeagueData from "./../CSV/PLData.csv";
import BundesligaData from "./../CSV/BL1Data.csv";
import SerieAData from "./../CSV/SAData.csv";
import PrimeraDivisionData from "./../CSV/PPLData.csv";
import Ligue1 from "./../CSV/FL1Data.csv";

function PredictionsPage() {
  const [teamNames, setTeamNames] = useState([]);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const leagueOptions = [
    { name: "Premier League", csvFile: PremierLeagueData },
    { name: "Bundesliga", csvFile: BundesligaData },
    { name: "Serie A", csvFile: SerieAData },
    { name: "Primera Division", csvFile: PrimeraDivisionData },
    { name: "Ligue 1", csvFile: Ligue1 },
  ];

  useEffect(() => {
    if (selectedLeague) {
      Papa.parse(selectedLeague, {
        download: true,
        header: true,
        complete: function (results) {
          const teamsData = results.data;
          const uniqueTeamNames = getUniqueTeamNames(teamsData);
          setTeamNames(uniqueTeamNames);
        }
      });
    }
  }, [selectedLeague]);

  function getUniqueTeamNames(teamsData) {
    const uniqueNames = new Set();
    teamsData.forEach((team) => {
      uniqueNames.add(team.HomeTeam);
      uniqueNames.add(team.AwayTeam);
    });
    return Array.from(uniqueNames)
      .sort()
      .filter((name) => name !== "" && name !== undefined);
  }

  function handleHomeTeamChange(event) {
    const selectedTeam = event.target.value;
    setHomeTeam(selectedTeam);
  }

  function handleAwayTeamChange(event) {
    const selectedTeam = event.target.value;
    setAwayTeam(selectedTeam);
  }

  function handleLeagueChange(event) {
    const selectedLeague = event.target.value;
    setSelectedLeague(selectedLeague);
  }

  const handleConfirmClick = () => {
    if (homeTeam && awayTeam) {
      setIsLoading(true); 
      setTimeout(() => {
        setIsLoading(false); 
        const chosenTeams = [homeTeam, awayTeam];
        console.log(chosenTeams) ///////////// To display the teams chosen /////////////////////
      }, 2000);
    }
  };

  return (
    <div className="predictions-container">
      <div id="header" className="predictions-header-container">
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
                    <Link to="/standings?league=primeiraliga">Primeira Liga</Link>
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

        <div className="predictions-content">
          <h2>Match Predictor</h2>
          <div className="league-select">
            <h3>Select League:</h3>
            <select value={selectedLeague} onChange={handleLeagueChange}>
              <option value="" disabled>
                Select League
              </option>
              {leagueOptions.map((league, index) => (
                <option key={index} value={league.csvFile}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>
          <div className="team-select">
            <div>
              <h3>Select Home Team:</h3>
              <select value={homeTeam} onChange={handleHomeTeamChange}>
                <option value="">Home Team</option>
                {teamNames.map((team, index) => {
                  if (team !== awayTeam) {
                    return (
                      <option key={`home-team-${index}`} value={team}>
                        {team}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>
            </div>
            <div>
              <h3>Select Away Team:</h3>
              <select value={awayTeam} onChange={handleAwayTeamChange}>
                <option value="">Away Team</option>
                {teamNames.map((team, index) => {
                  if (team !== homeTeam) {
                    return (
                      <option key={`away-team-${index}`} value={team}>
                        {team}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>
            </div>
          </div>
          <button onClick={handleConfirmClick}>Confirm Selections</button>
          {isLoading && (
            <div className="loading-circle">
              Processing...    
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PredictionsPage;
