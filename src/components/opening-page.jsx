import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../opening-page.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import OpeningVideo from "./../images/Opening video.mp4";
import LoadingVideo from "./../images/Loading Video.mp4";

function OpeningPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const redirectToLeagueTable = (event) => {
    const selectedOption = event.target.value;

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
      case "Campeonato Brasileiro Série A":
        navigate("/standings?league=campeonatobrasileiroseriea");
        break;
      case "Eredivisie":
        navigate("/standings?league=eredivisie");
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Refreshing Your Page</p>
        <video className="loading-video" autoPlay muted loop>
          <source src={LoadingVideo} type="video/mp4" />
        </video>
        <div className="loading-spinner"></div>
      </div>
    );
  }

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
