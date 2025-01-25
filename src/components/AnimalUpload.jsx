import React, { useState } from 'react';

const AnimalUpload = ({ onAddAnimal }) => {
  const [image, setImage] = useState(null);
  const [sound, setSound] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSoundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const soundUrl = URL.createObjectURL(file);
      setSound(soundUrl);
    }
  };

  const handleSubmit = () => {
    if (image && sound) {
      onAddAnimal({ image, sound });
      setImage(null);
      setSound(null);
    } else {
      alert('Please upload both an image and a sound.');
    }
  };

  return (
    <div>
      <h3>Upload Animal</h3>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="file" accept="audio/*" onChange={handleSoundChange} />
      <button onClick={handleSubmit}>Add Animal</button>
    </div>
  );
};

export default AnimalUpload;
