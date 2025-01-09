import {useParams, useNavigate} from "react-router-dom";
import React,{useState, useContext, useEffect} from "react";
import gameData from "./movie_images.json";
import { AuthContext } from "./AuthContext";
import { Scorecontext } from "./Scorecontext";

const Genre = () => {
    const {name} = useParams();
    const genreData = gameData[name];

    const {username} = useContext(AuthContext);

    const {score, setUserScore} = useContext(Scorecontext);

    const [currentLevel, setCurrentLevel] = useState(null);

    useEffect(() => {
        if (username && name) {
            fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/get-progress/${username}`)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch progress');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data?.progress && data.progress[name] !== undefined) {
                        // console.log('Fetched Progress Data: ', data);
                        setCurrentLevel(data.progress[name]);
                    } else {
                        setCurrentLevel(0);
                    }
                })
                .catch((error) => {
                    // console.error('Error fetching progress:', error);
                    setCurrentLevel(0);
                });
        } else {
            setCurrentLevel(0);
        }
    }, [username, name]);

    const currentMovie = genreData[currentLevel];

    const [alertMessage,setAlertMessage] = useState(null); 
    
    const [userInput, setUserInput] = useState("");
    
    const navigate = useNavigate();

    const showAlert = (type, text) => {
        setAlertMessage({ type, text });
        setTimeout(() => setAlertMessage(null), 2000);
    };

    const updateProgress = async (updatedLevel) => {
        try {
            // console.log("Request Body To Send:", { genre: name, level: updatedLevel });

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/update-progress/${username}`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({genre: name, level: updatedLevel}), 
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

    const updateScore = async (updatedScore) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/update-score/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({score: updatedScore}),
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

            if (currentLevel + 1 <= genreData.length) {

                let updatedScore = score + 100;
                setUserScore(updatedScore);
                updateScore(updatedScore);

                setUserInput("");
                showAlert("success", "Correct Answer");

                let updatedLevel = currentLevel + 1;
                setCurrentLevel(updatedLevel);
                updateProgress(updatedLevel);

            } 
            else {
                showAlert("success", "Congrats! Completed all levels in this genre.");
                navigate("/select");
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

            <div className="header">
                <button type="button" className="btn btn-primary" onClick={() => navigate("/select")}>Back</button>
                <h1>{name}</h1>
            </div>

            {currentLevel + 1 <= genreData.length ? (
                currentMovie ? (
                    <>
                        <div className="card mb-3">
                            <h3 className="card-header">Level {currentLevel + 1}</h3>
                            <img className="d-block user-select-none" src={currentMovie.dalle_3_img} alt="Plot"/>
                            <div className="card-body">
                                <p className="card-text">Guess The Movie</p>
                            </div>
                        </div>
                        
                        <div className="input-guess">
                            <input className="form-control form-control-lg" type="text" placeholder="Enter" id="inputLarge" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleSubmission}/>
                            <button type="button" className="btn btn-primary" onClick={checkAnswer}> Submit </button>
                        </div>
                    </>
                ) : ( <center><h4>Loading ...</h4></center> )
            ) : ( <center><h3>All Levels Completed</h3></center> )}

            {alertMessage && 
                (<div className={`alert alert-dismissible alert-${alertMessage.type}`}>
                    <strong>{alertMessage.text}</strong>
                </div>)
            }
            
        </div>
    );
};

export default Genre;
