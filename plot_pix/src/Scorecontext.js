import React, { createContext, useState } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [userScore, setUserScore] = useState(0);

    return (
        <ScoreContext.Provider value={{ userScore, setUserScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
