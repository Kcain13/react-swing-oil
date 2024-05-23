// src/components/profile/trophyRoom.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TrophyRoom = () => {
    const { golferId } = useParams();
    const [golfer, setGolfer] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [handicap, setHandicap] = useState('Not available');

    useEffect(() => {
        const fetchTrophyRoom = async () => {
            try {
                const response = await axios.get(`/api/golfers/${golferId}/trophy-room`);
                setGolfer(response.data.golfer);
                setMilestones(response.data.milestones);
                setHandicap(response.data.handicap);
            } catch (err) {
                console.error('Error fetching trophy room data:', err);
            }
        };

        fetchTrophyRoom();
    }, [golferId]);

    if (!golfer) return <div>Loading...</div>;

    return (
        <div>
            <h1>{golfer.username}'s Trophy Room</h1>
            <div>
                <h2>Handicap: {handicap}</h2>
                <h2>Statistics</h2>
                <p>Average Score: {golfer.statistics?.average_score ?? 'N/A'}</p>
                <p>Fairway Hit %: {golfer.statistics?.fairway_hit_percentage ?? 'N/A'}</p>
                <p>Green in Regulation %: {(golfer.statistics?.green_in_regulation_percentage ?? 'N/A').toFixed(2)}%</p>
                <p>Average Number of Putts per Round: {(golfer.statistics?.putts_per_round ?? 'N/A').toFixed(2)}</p>
                <p>Bunker Save %: {(golfer.statistics?.bunker_save_percentage ?? 'N/A').toFixed(2)}%</p>
            </div>
            <div>
                <h2>Milestones</h2>
                {milestones.length ? (
                    milestones.map(milestone => (
                        <p key={milestone.date}>
                            {new Date(milestone.date).toLocaleDateString()}: {milestone.type} - {milestone.details}
                        </p>
                    ))
                ) : (
                    <p>No milestones achieved yet.</p>
                )}
            </div>
        </div>
    );
};

export default TrophyRoom;
