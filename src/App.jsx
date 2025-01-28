import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateGame from './pages/CreateGame';
import PlayGame from './pages/PlayGame';
import InfiniteCanvasPage from './pages/InfiniteCanvas';
import CreateAnimalSoundGame from './pages/CreateAnimalSoundGame';
import GamesList from './pages/GameList';
import PlayAnimalSoundGame from './pages/playAnimalGame';
import Render3DObject from './components/Render3DObject';
import PaintFill from './components/paintFill';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/play/:gameId" element={<PlayGame />} />
        <Route path="/canvas" element={<InfiniteCanvasPage />} />
        <Route path="/createanimalsound" element={<CreateAnimalSoundGame />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/playanimal/:id" element={<PlayAnimalSoundGame />} />
        <Route path="/render3d" element={<Render3DObject />} />
        <Route path="/paintfill" element={<PaintFill />} />
      </Routes>
    </Router>
  );
}

export default App;
