import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateGame from './pages/CreateGame';
import PlayGame from './pages/PlayGame';
import InfiniteCanvasPage from './pages/InfiniteCanvas';
import AnimalSoundPage from './pages/AnimalSoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/play/:gameId" element={<PlayGame />} />
        <Route path="/canvas" element={<InfiniteCanvasPage />} />
        <Route path="/animalsound" element={<AnimalSoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
