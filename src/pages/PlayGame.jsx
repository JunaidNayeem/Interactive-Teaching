import React from 'react';
import { useParams } from 'react-router-dom';
import GameCanvas from '../components/GameCanvas';

const PlayGame = () => {
    const { gameId } = useParams();
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const game = games.find((g) => g.id === gameId);

    return (
        <div>
            <h1>Play Game</h1>
            {game && (
                <GameCanvas
                    imageSrc={game.imageSrc}
                    imagePosition={game.imagePosition || { x: 0, y: 0 }} 
                    setImagePosition={() => { }}
                />
            )}
        </div>
    );
};

export default PlayGame;
