import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Scorecard = () => {
    const { roundId } = useParams();
    const [holes, setHoles] = useState([]);
    const [scores, setScores] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoundDetails = async () => {
            try {
                const response = await axios.get(`/api/rounds/${roundId}`);
                const courseDetails = await axios.get(`/api/courses/${response.data.courseId}`);

                const teeSet = courseDetails.data.TeeSets.find(
                    tee => tee.TeeSetRatingId === response.data.teeId
                );

                setHoles(teeSet.Holes);
            } catch (err) {
                console.error('Failed to fetch round or course details', err);
            }
        };

        fetchRoundDetails();
    }, [roundId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setScores({
            ...scores,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const scoreData = holes.map(hole => ({
                holeNumber: hole.Number,
                holePar: hole.Par,
                yardage: hole.Length,
                holeHandicap: hole.Allocation,
                score: scores[`score-${hole.Number}`],
                fairwayHit: scores[`fairwayHit-${hole.Number}`] || false,
                greenInRegulation: scores[`greenInRegulation-${hole.Number}`] || false,
                putts: scores[`putts-${hole.Number}`] || 0,
                bunkerShots: scores[`bunkerShots-${hole.Number}`] || 0,
                penalties: scores[`penalties-${hole.Number}`] || 0
            }));

            await axios.post(`/api/rounds/${roundId}/scores`, { scores: scoreData });
            navigate(`/rounds/${roundId}`);
        } catch (err) {
            console.error('Failed to submit scores', err);
            setErrors({ submit: 'Failed to submit scores. Please try again.' });
        }
    };

    return (
        <div className="container">
            <h1>Scorecard for Round {roundId}</h1>
            {errors.submit && <p className="error">{errors.submit}</p>}
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Hole Number</th>
                            <th>Par</th>
                            <th>Yardage</th>
                            <th>Handicap</th>
                            <th>Score</th>
                            <th>Fairway Hit</th>
                            <th>Green in Regulation</th>
                            <th>Putts</th>
                            <th>Bunker Shots</th>
                            <th>Penalties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holes.map(hole => (
                            <tr key={hole.Number}>
                                <td>{hole.Number}</td>
                                <td>{hole.Par}</td>
                                <td>{hole.Length} yards</td>
                                <td>{hole.Allocation}</td>
                                <td>
                                    <input
                                        type="number"
                                        name={`score-${hole.Number}`}
                                        min="1"
                                        max="15"
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`fairwayHit-${hole.Number}`}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`greenInRegulation-${hole.Number}`}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name={`putts-${hole.Number}`}
                                        min="0"
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name={`bunkerShots-${hole.Number}`}
                                        min="0"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name={`penalties-${hole.Number}`}
                                        min="0"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary">Submit Scores</button>
            </form>
        </div>
    );
};

export default Scorecard;
