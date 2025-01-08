import React from 'react';
import { Line } from "react-chartjs-2";

const RealtimeLineGraph = ({ data }) => {

    // Data for Line Chart
    const lineData = {
        labels: data.timestamps,
        datasets: [{
            data: data.data,
            tension: 0,
        }],
    };
    // const lineData = {
    //     labels: data.timestamps,
    //     datasets: {
    //         label: data.camera,
    //         data: data.data,
    //         tension: 0,
    //     },
    // };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 100, // Duration in milliseconds (shorter for snappy effect)
            easing: "easeOutQuad", // Snappy easing function
        },
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            title: {
                display: true,
                text: "Bandwidth consumption (Mbps)",
                color: "#FFF", // Title color
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#FFF", // X-axis label color
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#FFF", // Y-axis label color
                },
            },
        },
    };

    return (
        < Line data={lineData} options={options} />
    )
}

export default RealtimeLineGraph;