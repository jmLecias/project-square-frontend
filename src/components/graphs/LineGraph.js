import React from 'react';
import { Line } from "react-chartjs-2";

const LineGraph = ({ data }) => {

    // Data for Line Chart
    const lineData = {
        labels: (data.length !== 0) ? data[0].days : [],
        datasets: (data.length !== 0) ?  [
            ...data.map((line) => {
                return (
                    {
                        label: line.location,
                        data: line.data,
                        tension: 0.4,
                    }
                )
            })
        ] : [],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Last 7 days Created Location Detections Overview",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        < Line data={lineData} options={options} />
    )
}

export default LineGraph;