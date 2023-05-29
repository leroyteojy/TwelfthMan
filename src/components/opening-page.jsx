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
              <Link to="/prediction">Predictions</Link>
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
                <option value="PL">Premier League</option>
                <option value="Bundesliga">Bundesliga</option>
                <option value="Primera Division">Primera Division</option>
                <option value="Serie A">Serie A</option>
                <option value="Ligue 1">Ligue 1</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default OpeningPage;
