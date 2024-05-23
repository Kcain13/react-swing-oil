import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Plotly from 'react-plotly.js';

const RoundDetails = () => {
    const { roundId } = useParams();
    const [round, setRound] = useState(null);
    const [statistics, setStatistics] = useState({});
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const fetchRoundDetails = async () => {
            try {
                const response = await axios.get(`/api/rounds/${roundId}`);
                setRound(response.data.round);
                setStatistics(response.data.statistics);
                setGraphData(response.data.graphData);
            } catch (err) {
                console.error('Failed to fetch round details', err);
            }
        };

        fetchRoundDetails();
    }, [roundId]);

    if (!round) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>Round Details for Round ID: {round.id}</h2>
            <div className="statistics">
                <p>Total Score: {statistics.totalScore}</p>
                <p>Score for First 9 Holes: {statistics.firstNineScore}</p>
                <p>Score for Last 9 Holes: {statistics.lastNineScore}</p>
                <p>Total Putts: {statistics.totalPutts}</p>
                <p>Total Fairways Hit: {statistics.fairwaysHitRatio}</p>
                <p>Total Greens in Regulation: {statistics.greensInRegulationRatio}</p>
                <p>Total Penalties: {statistics.totalPenalties}</p>
                <p>Total Bunker Shots: {statistics.totalBunkerShots}</p>
            </div>

            <div id="graph">
                {graphData.data && graphData.layout ? (
                    <Plotly data={graphData.data} layout={graphData.layout} />
                ) : (
                    <p>No data available for the graph.</p>
                )}
            </div>
        </div>
    );
};

export default RoundDetails;
