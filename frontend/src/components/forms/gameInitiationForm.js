import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const GameInitiationForm = () => {
    const [tees, setTees] = useState([]);
    const [gameTypes, setGameTypes] = useState([]);
    const [selectedTee, setSelectedTee] = useState('');
    const [selectedGameType, setSelectedGameType] = useState('');
    const [useHandicap, setUseHandicap] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const courseResponse = await axios.get(`/api/courses/${courseId}`);
                const gameTypeResponse = await axios.get('/api/game-types');

                const tees = courseResponse.data.TeeSets.map(tee => ({
                    id: tee.TeeSetRatingId,
                    name: `${tee.TeeSetRatingName} - ${tee.TotalYardage} yards`
                }));
                setTees(tees);
                setGameTypes(gameTypeResponse.data);
            } catch (err) {
                console.error('Failed to fetch course or game type details', err);
            }
        };

        fetchDetails();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/courses/${courseId}/start-game`, {
                tee: selectedTee,
                gameType: selectedGameType,
                useHandicap
            });
            navigate(`/scorecard/${response.data.roundId}`);
        } catch (err) {
            console.error('Failed to start game', err);
            setErrors({ submit: 'Failed to start game. Please try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.submit && <p className="error">{errors.submit}</p>}
            <div>
                <label htmlFor="tee">Tee:</label>
                <select id="tee" value={selectedTee} onChange={e => setSelectedTee(e.target.value)}>
                    <option value="">Select a tee</option>
                    {tees.map(tee => (
                        <option key={tee.id} value={tee.id}>{tee.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="gameType">Game Type:</label>
                <select id="gameType" value={selectedGameType} onChange={e => setSelectedGameType(e.target.value)}>
                    <option value="">Select a game type</option>
                    {gameTypes.map(gameType => (
                        <option key={gameType.id} value={gameType.id}>{gameType.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="useHandicap">Use Handicap:</label>
                <input
                    type="checkbox"
                    id="useHandicap"
                    checked={useHandicap}
                    onChange={e => setUseHandicap(e.target.checked)}
                />
            </div>
            <button type="submit">Start Game</button>
        </form>
    );
};

export default GameInitiationForm;
