import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const [score, setScore] = useState(null);
    const {username} = useContext(AuthContext);

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:5001/api/get-score/${username}`)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch initial score');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched Score Data: ', data);
                    setScore(data.score);
                })
                .catch((error) => {
                    console.error('Error fetching initial score:', error);
                    setScore(0);
                });
        } else {
            setScore(0);
        }
    }, [username]);

    const setUserScore = (newScore) => {
        setScore(newScore);
    };

    return (
        <ScoreContext.Provider value={{ score, setUserScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
