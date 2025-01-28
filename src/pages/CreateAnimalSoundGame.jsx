import React, { useState } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://bbb-canvas-backend.onrender.com');

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

  // const handleSoundUpload = (e, index) => {
  //   const newAnimals = [...animals];
  //   const file = e.target.files[0];
  //   if (file) {
  //     newAnimals[index] = {
  //       ...newAnimals[index],
  //       sound: URL.createObjectURL(file),
  //     };
  //     setAnimals(newAnimals);
  //   }
  // };

  const handleSoundUpload = async (e, index) => {
    const newAnimals = [...animals];
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("https://bbb-canvas-backend.onrender.com/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        newAnimals[index] = {
          ...newAnimals[index],
          sound: data.fileUrl, // Save the file URL returned by the server
        };
        setAnimals(newAnimals);
      } catch (error) {
        console.error("Failed to upload sound:", error);
      }
    }
  };

  
  const addAnimal = () => {
    setAnimals([...animals, { image: "", sound: "" }]);
  };

  const saveGame = () => {
    // const savedGames = JSON.parse(localStorage.getItem("animalSoundGames")) || [];
    const newGame = {
      id: Date.now(),
      animals,
    };
    // localStorage.setItem("animalSoundGames", JSON.stringify([...savedGames, newGame]));
    socket.emit('new_game', newGame); // Emit the new game event to the server
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
