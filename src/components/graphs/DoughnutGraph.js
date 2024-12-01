import React from 'react';
import { Doughnut } from "react-chartjs-2";

const DoughnutGraph = () => {

    // Data for Doughnut Chart
    const doughnutData = {
        labels: ["Recognized", "Unknown"],
        datasets: [
            {   
                data: [55, 15],
                backgroundColor: [
                    "rgba(33, 123, 168, 0.5)",
                    "rgba(255, 99, 132, 0.5)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };


    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "right",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        // Custom tooltip label
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ${value}%`; // Example: "Electronics: 25%"
                    },
                },
            },
        },
    };
    return (
        <Doughnut data={doughnutData} options={doughnutOptions} />
    )
}

export default DoughnutGraph;