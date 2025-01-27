import React from "react";
import { Link } from "react-router-dom";

const GamesList = () => {
    const games = JSON.parse(localStorage.getItem("animalSoundGames")) || [];
  
    return (
      <div>
        <h1>Saved Games</h1>
        <Link to="/create">
          <button>Create New Game</button>
        </Link>
        <div style={{ marginTop: "20px" }}>
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} style={{ marginBottom: "10px" }}>
                <Link to={`/playanimal/${game.id}`}>Game ID: {game.id}</Link>
              </div>
            ))
          ) : (
            <p>No games saved yet.</p>
          )}
        </div>
      </div>
    );
  };
export default GamesList;