import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameTypes = () => {
    const [gameTypes, setGameTypes] = useState([]);

    useEffect(() => {
        const fetchGameTypes = async () => {
            try {
                const response = await axios.get('/api/gameTypes');
                setGameTypes(response.data);
            } catch (err) {
                console.error('Error fetching game types:', err);
            }
        };

        fetchGameTypes();
    }, []);

    return (
        <div>
            <h1>Game Types</h1>
            <ul>
                {gameTypes.map((gameType) => (
                    <li key={gameType._id}>
                        <h2>{gameType.name}</h2>
                        <p>{gameType.description}</p>
                        <p>{gameType.rules}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameTypes;
