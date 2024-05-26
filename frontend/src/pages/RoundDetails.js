// src/pages/RoundDetailsPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import RoundDetails from '../components/rounds/RoundDetails';

const RoundDetailsPage = () => {
    const { id } = useParams();

    return (
        <div className="round-details-page">
            <RoundDetails roundId={id} />
        </div>
    );
};

export default RoundDetailsPage;
