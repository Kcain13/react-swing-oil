// src/pages/ScorecardPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import Scorecard from '../components/rounds/Scorecard';

const ScorecardPage = () => {
    const { id } = useParams();

    return (
        <div className="scorecard-page">
            <Scorecard roundId={id} />
        </div>
    );
};

export default ScorecardPage;
