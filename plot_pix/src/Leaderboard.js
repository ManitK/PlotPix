import React, { useEffect, useState } from "react";

const Leaderboard = () => {
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
                        setLeaderboardDict(data.dict);
                        // console.log("Fetched Data:", data.dict);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
        },[]);
    
    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <table className = "table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">No.</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                {leaderboardDict ? 
                    Object.keys(leaderboardDict).map((key, index) => (
                        <tr key={key}>
                            <th scope="row">{index + 1}</th>
                            <td>{key}</td>
                            <td>{leaderboardDict[key]}</td>
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