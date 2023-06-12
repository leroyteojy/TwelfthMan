import React from "react";
import "./../predictions.css";
import TwelfthManLogo from "./../images/TwelfthManLogo.jpg";
import { Link } from "react-router-dom";

function PredictionsPage() {
  return (
    <div className="predictions-container">
      <div id="header" className="predictions-header-container">
        <div className="container">
          <nav>
            <img src={TwelfthManLogo} alt="TwelfthManLogo" />
            <h2>Under Development!</h2>
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
                    <Link to="/standings?league=campeonatobrasileiroseriea">Campeonato Brasileiro Série A</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Add your predictions content */}
    </div>
  );
}

export default PredictionsPage;
