import { Link } from "react-router-dom";
import { ScoreContext } from "./Scorecontext";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
    const { userScore } = useContext(ScoreContext);
    const {isLoggedIn, login, logout} = useContext(AuthContext);

    return ( 
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">

            
            <div className="d-flex w-100 justify-content-between align-items-center">
                <Link to = "/" className="navbar-brand" style = {{textDecoration: "none"}}>
                    <h1 className="navbar-brand">PlotPix</h1>
                </Link>

                <h1 className="navbar-brand mx-auto" style={{textDecoration: "none"}}>Score: {userScore}</h1>

                {!isLoggedIn ? 
                        // Link to login page
                        <Link to="/login" className="navbar-brand" style={{textDecoration: "none", color: "white", fontSize: "1.25rem"}}>
                            Login
                        </Link> : 
                        // Logout button
                        <button className="btn btn-danger" onClick={logout}>Logout</button>
                    }
                </div>
            
            </div>
        </nav>
    );
}
 
export default Navbar;