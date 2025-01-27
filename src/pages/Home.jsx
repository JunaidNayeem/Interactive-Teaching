import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const savedGames = JSON.parse(localStorage.getItem("games")) || [];
  const animalSoundGames =
    JSON.parse(localStorage.getItem("animalSoundGames")) || [];

  return (
    <div>
      <h1>Home</h1>
      <Link to="/create-game">Create New Game</Link>
      <ul>
        {savedGames.map((game, index) => (
          <li key={index}>
            <Link to={`/play/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/canvas">Infinite Canvas</Link>
      <br />
      <Link to="/createanimalsound">Animal Sound</Link>
      <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
        {animalSoundGames.length > 0 ? (
          animalSoundGames.map((game, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <Link
                to={`/playanimal/${game.id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {game.name || `Game ${index + 1}`}
              </Link>
            </li>
          ))
        ) : (
          <p>No games available. Create one!</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
