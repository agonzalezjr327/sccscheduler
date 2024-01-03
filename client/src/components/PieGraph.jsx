import React from 'react';
import { Pie } from 'react-chartjs-2';

export const PieGraph = (props) => {

    return (
       <Pie data={props.raceList} />
    );
};