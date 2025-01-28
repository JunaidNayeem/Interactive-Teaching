import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io('https://bbb-canvas-backend.onrender.com');

const GamesList = () => {
  const [games, setGames] = useState([]);
    // const games = JSON.parse(localStorage.getItem("animalSoundGames")) || [];

    useEffect(() => {
      // Fetch initial games list when the component mounts
      socket.on("init_games", (initialGames) => {
        console.log("Received initial games:", initialGames);
        setGames(initialGames);
      });
  
      // Listen for updates to the games list
      socket.on("update_games", (updatedGames) => {
        console.log("Games list updated:", updatedGames);
        setGames(updatedGames);
      });
  
      // Clean up Socket.IO listeners when the component unmounts
      return () => {
        socket.off("init_games");
        socket.off("update_games");
      };
    }, []);
  
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