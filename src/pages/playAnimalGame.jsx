import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

// const socket = io('https://bbb-canvas-backend.onrender.com');
const socket = io("http://localhost:5000");


 const PlayAnimalSoundGame = () => {
  const { id: gameId } = useParams(); 
  // const games = JSON.parse(localStorage.getItem("animalSoundGames")) || [];
  const [games, setGames] = React.useState([]);
  const game = games.find((g) => g.id === parseInt(gameId));

  useEffect(() => {
    socket.on('init_games', (initialGames) => {
      setGames(initialGames);
    });

    socket.on('update_games', (updatedGames) => {
      setGames(updatedGames);
    });

    socket.on('play_audio', (soundUrl) => {
      const audio = new Audio(soundUrl);
      audio.play();
    });

    return () => {
      socket.off('init_games');
      socket.off('update_games');
      socket.off('play_audio');
    };
  }, []);

  if (!game) {
    return <p>Game not found!</p>;
  }

  const handleImageClick = (soundUrl) => {
    // const audio = new Audio(soundUrl);
    // audio.play();
    socket.emit('play_audio', soundUrl); // Emit the audio play event to the server
  };

  return (
    <div>
      <h1>Play Animal Sound Game</h1>
      {game.animals.map((animal, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <img
            src={animal.image}
            alt={`Animal ${index + 1}`}
            style={{ width: "200px", height: "200px", cursor: "pointer" }}
            onClick={() => handleImageClick(animal.sound)}
          />
        </div>
      ))}
    </div>
  );
};

export default PlayAnimalSoundGame;