import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export const JobFieldBarGraph = (props) => {

    return (
            <Bar data={props.jobFieldList} />
    );
};
