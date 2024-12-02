import React from 'react';
import { Bar } from "react-chartjs-2";

const BarGraph = ({data}) => {

    // Data for Bar Chart
    const barData = {
        labels: data.days,
        datasets: [
            {
                label: "Detections",
                data: data.data,
                backgroundColor: "rgba(56, 149, 195)",
                borderColor: "rgba(56, 149, 195)",
                borderWidth: 1,
            },
        ],
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
                text: "Last 7 Days Overview",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Bar data={barData} options={options} />
    )
}

export default BarGraph;