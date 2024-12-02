import React from 'react';
import { Doughnut } from "react-chartjs-2";

const DoughnutGraph = ({data}) => {

    // Data for Doughnut Chart
    const doughnutData = {
        labels: data.locations,
        datasets: [
            {
                data: data.data,
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
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2); 
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            title: {
                display: true,
                text: "Last 7 days Created Location Detections",
            },
        },
    };
    return (
        <Doughnut data={doughnutData} options={doughnutOptions} />
    )
}

export default DoughnutGraph;