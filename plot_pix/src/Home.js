import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    function handlePlayClick() {
        if (!isLoggedIn) {
            alert("You need to log in to play the game!");
            navigate("/login");
            return;
        }
        navigate('/select');
    }

    function handleLeaderboardClick() {
        navigate('/leaderboard');
    }

    return ( 
        <div className = "play-page">
            <img className = "logo" src="./game_logo.png" alt="game_logo"/>
                <div className="btn-container">
                    <button type="button" className="btn btn-primary" onClick = {handlePlayClick}>Play</button>
                    <button type="button" className="btn btn-primary" onClick = {handleLeaderboardClick}>Leaderboard</button>
                </div>
        </div>
     );
}
 
export default Home;