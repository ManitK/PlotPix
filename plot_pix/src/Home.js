import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigateToGenre = useNavigate();
    function handlePlayClick() {
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