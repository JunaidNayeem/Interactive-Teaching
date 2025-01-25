import React, { useState } from 'react';

const AnimalSoundUploader = () => {
  const [animals, setAnimals] = useState([]); // Array to store uploaded animal data (image & sound)

  const handleImageUpload = (e, index) => {
    const newAnimals = [...animals];
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newAnimals[index] = {
          ...newAnimals[index],
          image: reader.result, // Set the uploaded image as a data URL
        };
        setAnimals(newAnimals); // Update the state with the new image
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const handleSoundUpload = (e, index) => {
    const newAnimals = [...animals];
    const file = e.target.files[0];
    if (file) {
      newAnimals[index] = {
        ...newAnimals[index],
        sound: URL.createObjectURL(file), // Set the uploaded sound as a URL
      };
      setAnimals(newAnimals); // Update the state with the new sound
    }
  };

  const handleImageClick = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const addAnimal = () => {
    setAnimals([
      ...animals,
      { image: '', sound: '' }, // Add a new animal object to the array
    ]);
  };

  return (
    <div>
      <h1>Upload Animal Image and Sound</h1>
      
      {/* Add button to add more animal uploads */}
      <button onClick={addAnimal}>Add Anima and sound</button>

      {animals.map((animal, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleSoundUpload(e, index)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
          </div>

          {animal.image && animal.sound && (
            <div>
              <img
                src={animal.image}
                alt={`Animal ${index + 1}`}
                style={{ width: '200px', height: '200px', cursor: 'pointer' }}
                onClick={() => handleImageClick(animal.sound)} // Play sound when image is clicked
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnimalSoundUploader;
