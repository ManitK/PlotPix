import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ScoreContext } from "./ScoreContext"; 

const Leaderboard = () => {
    const { username } = useContext(AuthContext);
    const { score } = useContext(ScoreContext);
    console.log(username, score);

    const [leaderboardDict, setLeaderboardDict] = useState(null);

    useEffect(() => {
                fetch(`http://localhost:5001/api/get-leaderboard/`)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('Failed to fetch leaderboard dictionary');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setLeaderboardDict(data);
                    })
                    .catch((error) => {
                        console.error('Error fetching initial score:', error);
                    });
        },[]);
    
    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <table className = "table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                {leaderboardDict ? Object.entries(leaderboardDict).map(([username, score], index) => (
                              <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{username}</td>
                                  <td>{score}</td>
                              </tr>
                          ))
                        : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                    Loading...
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
 
export default Leaderboard;