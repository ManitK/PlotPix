import {useParams} from "react-router-dom";
import React,{useState,useContext} from "react";
import gameDate from "./movie_images.json";
import { ScoreContext } from "./Scorecontext";
import { AuthContext } from "./AuthContext";

const Genre = () => {
    const {name} = useParams();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [userInput, setUserInput] = useState("");
    const genreData = gameDate[name];
    const currentMovie = genreData[currentLevel];
    const [alertMessage,setAlertMessage] = useState(null); 
    const { userScore, setUserScore } = useContext(ScoreContext);
    const { username } = useContext(AuthContext);

    const showAlert = (type, text) => {
        setAlertMessage({ type, text });
        setTimeout(() => setAlertMessage(null), 1500);
    };    

    const updateProgress = async () => {
        const user = username;
        const genre = name;

        try {
            const response = await fetch("/api/update-progress", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: user, genre, level: currentLevel}), 
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
            console.error("Error in Updation");
        }
    };

    const checkAnswer = () => {
        if (userInput.toLowerCase().trim() === currentMovie.title.toLowerCase()) {
            setUserScore(userScore + 100);
            if (currentLevel + 1 < genreData.length) {
                setCurrentLevel(currentLevel + 1);
                setUserInput("");
                showAlert("success", "Correct Answer");
                updateProgress(currentLevel + 1);
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
            <h1>{name}</h1>

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
