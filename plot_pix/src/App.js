import Navbar from './Navbar';
import Home from './Home';
import Select from './Select';
import Genre from './Genre';
import Login from './Login';
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