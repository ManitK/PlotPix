import {Link} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {ScoreContext} from "./ScoreContext";
import {AuthContext} from "./AuthContext";
import gameData from "./movie_images.json";

const Select = () => {

    const {score} = useContext(ScoreContext);
    const {username} = useContext(AuthContext);
    const [progressDict,setProgress] = useState({});

    const toPrintData = {};
    for (const genre in gameData) {
        toPrintData[genre] = [progressDict[genre] || 0, gameData[genre].length];
    }

    const genresDict = []
    for (const genre in gameData) {
        genresDict.push(genre);
    }

    useEffect(() => {
          if (username && score) {
              fetch(`http://localhost:5001/api/get-progress/${username}`)
                  .then((response) => {
                      if (response.status !== 200) {
                          throw new Error('Failed to fetch initial score');
                      }
                      return response.json();
                  })
                  .then((data) => {
                    setProgress(data.progress);
                  })
                  .catch((error) => {
                      console.error('Error fetching Progress:', error);
                      setProgress({});
                  });
          } else {
            setProgress({});
          }
      }, [username, score]);

    return (

      <div className="select-page">

        <div className="select-heading">
            <h1> Select Movie Genre </h1>
        </div>
      
        <div className="select-genre">


          <div className="action-section">
            <Link to="/genre/Action" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
              <div className="card-body">
                <h4 className="card-title">Action</h4>
              </div>
            </Link>

            <div class="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${(toPrintData['Action'][0] / toPrintData['Action'][1]) * 100}%` }}  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>


          <div className="comedy-section">
            <Link to="/genre/Comedy" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
              <div className="card-body">
                <h4 className="card-title">Comedy</h4>
              </div>
            </Link>

            <div class="progress">
                <div className="progress-bar" role="progressbar" style={{ width:`${(toPrintData['Comedy'][0] / toPrintData['Comedy'][1]) * 100}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div className="drama-section">
            <Link to="/genre/Drama" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
              <div className="card-body">
                <h4 className="card-title">Drama</h4>
              </div>
            </Link>

            <div class="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${(toPrintData['Drama'][0] / toPrintData['Drama'][1]) * 100}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div className="romance-section">
            <Link to="/genre/Romance" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
              <div className="card-body">
                <h4 className="card-title">Romance</h4>
              </div>
            </Link>

            <div class="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${(toPrintData['Romance'][0] / toPrintData['Romance'][1]) * 100}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

        </div>
      </div>
    )};
  
  export default Select;