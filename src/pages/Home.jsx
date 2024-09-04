import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const savedGames = JSON.parse(localStorage.getItem('games')) || [];

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
        </div>
    );
};

export default Home;
