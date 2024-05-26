// src/pages/GolferTrophyRoomPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import GolferTrophyRoom from '../components/profile/TrophyRoom';

const GolferTrophyRoomPage = () => {
    const { golferId } = useParams();

    return (
        <div className="golfer-trophy-room-page">
            <GolferTrophyRoom golferId={golferId} />
        </div>
    );
};

export default GolferTrophyRoomPage;
