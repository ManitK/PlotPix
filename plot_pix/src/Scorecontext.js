import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const [score, setScore] = useState(null);
    const {username} = useContext(AuthContext);

    useEffect(() => {
        if (username) {
            fetch(`/api/get-score/${username}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch initial score");
                    }
                    return response.json();
                })
                .then((data) => {
                    setScore(data.score);
                })
                .catch((error) => {
                    console.error("Error fetching initial score:", error);
                    setScore(0);
                });
        }
    }, [username]);

    const updateScore = (newScore) => {
        setScore(newScore);
    };

    return (
        <ScoreContext.Provider value={{ score, updateScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
