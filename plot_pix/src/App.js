import Navbar from './Navbar';
import Home from './Home';
import Select from './Select';
import Genre from './Genre';
import Login from './Login';
import SignUp from './SignUp';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScoreProvider } from "./Scorecontext";
import { AuthProvider } from "./AuthContext";



function App() {
  return (
    <AuthProvider>
      <ScoreProvider>
        <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route exact path = "/login" element = {<Login/>} />
            <Route exact path = "/signup" element = {<SignUp/>} />
            <Route exact path = "/" element = {<Home/>} />
            <Route exact path = "/select" element = {<Select/>} />
            <Route exact path = "/genre/:name" element = {<Genre/>} />
          </Routes>
        </div>
        </Router>
      </ScoreProvider>
    </AuthProvider>
  );
}

export default App;

// 1. select page
// implement progress bar for each genre 
// so user starts each particular genre with their last saved state

// 2. store scores and state of user for each genre

// 3. implement leaderboard page 