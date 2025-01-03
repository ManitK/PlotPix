import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigateToLogin = useNavigate();
    const navigateToGenre = useNavigate();

    function handlePlayClick() {
        if (!isLoggedIn) {
            alert("You need to log in to play the game!");
            navigateToLogin("/login");
            return;
        }
        navigateToGenre('/select');
    }

    return ( 
        <div className = "play-page">
            <img className = "logo" src="./game_logo.png" alt="game_logo"/>
            <button type="button" className="btn btn-primary" onClick = {handlePlayClick}>Play</button>
        </div>
     );
}
 
export default Home;