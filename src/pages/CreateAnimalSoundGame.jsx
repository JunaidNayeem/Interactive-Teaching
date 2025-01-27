import React, { useState } from 'react';
import { useNavigate,Link  } from 'react-router-dom';

export const CreateAnimalSoundGame = () => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  const handleImageUpload = (e, index) => {
    const newAnimals = [...animals];
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newAnimals[index] = {
          ...newAnimals[index],
          image: reader.result,
        };
        setAnimals(newAnimals);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSoundUpload = (e, index) => {
    const newAnimals = [...animals];
    const file = e.target.files[0];
    if (file) {
      newAnimals[index] = {
        ...newAnimals[index],
        sound: URL.createObjectURL(file),
      };
      setAnimals(newAnimals);
    }
  };

  const addAnimal = () => {
    setAnimals([...animals, { image: "", sound: "" }]);
  };

  const saveGame = () => {
    const savedGames = JSON.parse(localStorage.getItem("animalSoundGames")) || [];
    const newGame = {
      id: Date.now(),
      animals,
    };
    localStorage.setItem("animalSoundGames", JSON.stringify([...savedGames, newGame]));
    navigate("/games");
  };

  return (
    <div>
      <h1>Create Animal Sound Game</h1>
      <button onClick={addAnimal}>Add Animal</button>

      {animals.map((animal, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, index)}
            style={{ display: "block", marginBottom: "10px" }}
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleSoundUpload(e, index)}
            style={{ display: "block", marginBottom: "10px" }}
          />
          {animal.image && animal.sound && (
            <img
              src={animal.image}
              alt={`Animal ${index + 1}`}
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>
      ))}

      <button onClick={saveGame} disabled={animals.length === 0}>
        Save Game
      </button>
    </div>
  );
};

export default CreateAnimalSoundGame;
