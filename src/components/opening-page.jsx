import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../opening-page.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import OpeningVideo from "./../images/Opening video.mp4";

function OpeningPage() {
  const navigate = useNavigate();

  const redirectToLeagueTable = (event) => {
    const selectedOption = event.target.value;

    // Redirect to the corresponding league table page based on the selected option
    switch (selectedOption) {
      case "PL":
        navigate("/standings?league=pl");
        break;
      case "Bundesliga":
        navigate("/standings?league=bundesliga");
        break;
      case "Primera Division":
        navigate("/standings?league=primeradivision");
        break;
      case "Serie A":
        navigate("/standings?league=seriea");
        break;
      case "Ligue 1":
        navigate("/standings?league=ligue1");
        break;
      case "Primeira Liga":
        navigate("/standings?league=primeiraliga");
        break;
      case "Primeira Liga":
        navigate("/standings?league=primeiraliga");
        break;
      case "Eredivisie":
        navigate("/standings?league=eredivisie");
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  return (
    <>
      <img src={TwelfthManLogo} alt="TwelfthManLogo" />
      <div className="bg-overlay"></div>
      <video className="opening-video" id="myVideo" autoPlay muted loop>
        <source src={OpeningVideo} />
      </video>

      <div className="content">
        <br />
        <br />
        <br />
        <h1>Twelfth Man</h1>
        <p>
          <i>Your All-In-One Football Companion</i>
        </p>

        <nav>
          <ul>
            <li>
              <Link to="/predictions">Predictions</Link>
            </li>
            <li>
              <Link to="/fixtures">Fixtures</Link>
            </li>
            <li className="dropdown">
              <select
                name="league-tables"
                id="league-tables"
                onChange={redirectToLeagueTable}
              >
                <option value="" selected disabled>
                  League Tables
                </option>
                <option value="PL" id="tableoptions">Premier League</option>
                <option value="Bundesliga" id="tableoptions">Bundesliga</option>
                <option value="Primera Division" id="tableoptions">Primera Division</option>
                <option value="Serie A" id="tableoptions">Serie A</option>
                <option value="Ligue 1" id="tableoptions">Ligue 1</option>
                <option value="Primeira Liga" id="tableoptions">Primeira Liga</option>
                <option value="Eredivisie" id="tableoptions">Eredivisie</option>
                <option value="Campeonato Brasileiro Série A" id="tableoptions">Campeonato Brasileiro Série A</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default OpeningPage;
