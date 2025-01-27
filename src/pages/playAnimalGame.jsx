import React from "react";
import { useParams } from "react-router-dom";

 const PlayAnimalSoundGame = () => {
  const { id: gameId } = useParams(); 
  const games = JSON.parse(localStorage.getItem("animalSoundGames")) || [];
  const game = games.find((g) => g.id === parseInt(gameId));

  if (!game) {
    return <p>Game not found!</p>;
  }

  const handleImageClick = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
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