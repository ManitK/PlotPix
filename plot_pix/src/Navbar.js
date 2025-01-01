import { Link } from "react-router-dom";
import { ScoreContext } from "./Scorecontext";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
    const { userScore } = useContext(ScoreContext);
    const {isLoggedIn, login, logout} = useContext(AuthContext);

    return ( 
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">

            <div className="container-fluid d-flex justify-content-center align-items-center">
                <Link to = "/" className="navbar-brand" style = {{textDecoration: "none"}}>
                <h1 className="navbar-brand">PlotPix</h1>
                </Link>
                <h2 className="navbar-brand" style = {{textDecoration: "none"}} >Score: {userScore} </h2>
                {!isLoggedIn ? 
                // add link to login page
                    (<button className="btn btn-light" onClick={login}>Login / Signup</button>) : 
                    (<button className="btn btn-danger" onClick={logout}>Logout</button>)}
                </div>

        </nav>
    );
}
 
export default Navbar;