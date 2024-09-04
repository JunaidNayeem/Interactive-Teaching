import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import GameCanvas from '../components/GameCanvas';

const CreateGame = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 }); // Initialize imagePosition

    const saveGame = () => {
        const game = {
            id: `game-${Date.now()}`,
            name: `Game ${Date.now()}`,
            imageSrc,
            imagePosition, // Include imagePosition in the saved game data
        };
        const games = JSON.parse(localStorage.getItem('games')) || [];
        games.push(game);
        localStorage.setItem('games', JSON.stringify(games));
    };

    return (
        <div>
            <h1>Create Game</h1>
            <ImageUploader onUpload={setImageSrc} />
            {imageSrc && (
                <GameCanvas
                    imageSrc={imageSrc}
                    imagePosition={imagePosition}
                    setImagePosition={setImagePosition} // Pass setImagePosition to update the state
                />
            )}
            <button onClick={saveGame}>Save Game</button>
        </div>
    );
};

export default CreateGame;
