import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { ScoreContext } from "./ScoreContext";

const Navbar = () => {
    const { isLoggedIn, username } = useContext(AuthContext);
    console.log(isLoggedIn,username);
    const { score } = useContext(ScoreContext);

    return ( 
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    
                    <Link to = "/" className="navbar-brand" style = {{textDecoration: "none"}}>
                        <h1 className="navbar-brand title">PlotPix</h1>
                    </Link>

                    <h1 className="navbar-brand score" style={{textDecoration: "none"}}>Score: {score}</h1>

                    {!isLoggedIn ? 
                        (<Link to="/login" className="navbar-brand login" style={{ color: "white", fontSize: "1.25rem" }}> Login</Link>) : 
                        (<span className="navbar-brand login" style={{ color: "white", fontSize: "1.25rem" }}> {username} </span>)}
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;