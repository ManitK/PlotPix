import {useParams} from "react-router-dom";
import React,{useState,useContext} from "react";
import gameDate from "./movie_images.json";
import { AuthContext } from "./AuthContext";
import { ScoreContext } from "./ScoreContext";

const Genre = () => {
    const {username} = useContext(AuthContext);

    const {userScore, setUserScore} = useContext(ScoreContext);

    const {genreName} = useParams();
    const genreData = gameDate[genreName];

    const [currentLevel, setCurrentLevel] = useState(0);
    const currentMovie = genreData[currentLevel];

    const [alertMessage,setAlertMessage] = useState(null); 
    
    const [userInput, setUserInput] = useState("");    

    const showAlert = (type, text) => {
        setAlertMessage({ type, text });
        setTimeout(() => setAlertMessage(null), 1500);
    };

    // input to function is the current level of this genre
    const updateProgress = async (currentLevel) => {
        try {
            const response = await fetch(`/api/update-progress/${username}`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({genreName, level: currentLevel}), 
            });

            const data = await response.json();
            if (data.success) {
                console.log("Progress Updated Successfully");
            } 
            else {
                console.error("Error in Updation");
            }
        }
        catch (error) {
            console.error("Error in Progress Updation");
        }
    };

    const updateScore = async () => {
        try{
            const response = await fetch(`/api/update-score/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({score: userScore}),
            });

            const data = await response.json();
            if (data.success) {
                console.log("Score Updated Successfully");
            }
            else {
                console.error("Error in Updation");
            }
        }
        catch (error) {
            console.error("Error in Score Updation");
        }
    };

    const checkAnswer = async () => {
        if (userInput.toLowerCase().trim() === currentMovie.title.toLowerCase()) {
            
            setUserScore(userScore + 100);
            updateScore();

            if (currentLevel + 1 < genreData.length) {
                setUserInput("");
                showAlert("success", "Correct Answer");

                setCurrentLevel(currentLevel + 1);
                updateProgress(currentLevel);
            } 
            else {
                showAlert("success", "Congratulations! You've completed all levels in this genre.");
            }
        } else {
            showAlert("danger", "Wrong Answer");
        }
    };

    const handleSubmission = (e) => {
        if (e.key === "Enter") {
            checkAnswer();
        }
    }
    
    return (
        <div className="genre-page">
            <h1>{genreName}</h1>

            <div className="card mb-3">
                <h3 className="card-header">Level {currentLevel + 1}</h3>
                <img className="d-block user-select-none" src={currentMovie.dalle_3_img} alt="Plot"/>
                <div className="card-body">
                    <p className="card-text">Guess The Movie</p>
                </div>
                
            </div>

            <div className="input-guess">
                <input 
                className="form-control form-control-lg" 
                type="text" 
                placeholder="Enter" 
                id="inputLarge" 
                value = {userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleSubmission}/>

                <button type="button" className="btn btn-primary" onClick={checkAnswer}>Submit</button>
            </div>

            {alertMessage && 
                (<div className={`alert alert-dismissible alert-${alertMessage.type}`}>
                    <strong>{alertMessage.text}</strong>
                </div>)
            }
            
        </div>
    );
};

export default Genre;
