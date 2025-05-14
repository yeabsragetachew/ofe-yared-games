import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GameSelection from "./pages/GameSelection";
import BingoBoard from "./pages/BingoBoard";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game-selection" element={<GameSelection />} />
        <Route path="/bingo" element={<BingoBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
