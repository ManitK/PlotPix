import Navbar from './Navbar';
import Home from './Home';
import Select from './Select';
import Genre from './Genre';
import Login from './Login';
import SignUp from './SignUp';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import { ScoreProvider } from "./Scorecontext";
import ProtectedRoute from "./ProtectedRoute";
import Leaderboard from './Leaderboard';
import NotFound from './NotFound';

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
            <Route path="/select" element={ <ProtectedRoute> <Select/> </ProtectedRoute> }/>
            <Route path="/genre/:name" element={ <ProtectedRoute> <Genre/> </ProtectedRoute> }/>
            <Route exact path = "/leaderboard" element = {<Leaderboard/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        </Router>
      </ScoreProvider>
    </AuthProvider>
  );
}

export default App;