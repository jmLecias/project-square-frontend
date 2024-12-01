import React from 'react';
import { Line } from "react-chartjs-2";

const LineGraph = () => {

    // Data for Line Chart
    const lineData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Recognized",
                data: [10, 15, 8, 12, 7],
                borderColor: "rgba(33, 123, 168, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
            {
                label: "Unknown",
                data: [7, 10, 5, 9, 3],
                borderColor: "rgba(201, 60, 86, 1)",
                backgroundColor: "rgba(201, 60, 86, 0.2)",
                tension: 0.4,
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
                text: "Weekly Data Overview",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        < Line data = { lineData } options = { options } />
    )
}

export default LineGraph;