import React, { useEffect } from 'react';
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { List } from 'rsuite';

import { squareApiBaseUrl } from '../../api/square_api';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainHeader from '../../components/headers/MainHeader';

import { FaUserCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

const DashboardPage = () => {

    useEffect(() => {
        // if (!isFetching) {
        //     isFetching = true;

        //     getLocationCameras(id).then((res) => {
        //         setGroup(res.group);
        //         setLocation(res.location);
        //         setCameras(res.cameras);
        //         setDetections(res.detections);
        //         handleBreadcrumbs(res.group, res.location);
        //         isFetching = false;
        //     }).catch((e) => {
        //         console.log("Error while getting location cameras data: " + e);
        //         isFetching = false;
        //     });
        // }

        // return () => {
        //     setGroup(null);
        //     setLocation(null);
        //     setCameras([]);
        //     setDetections([]);
        // };
    }, []);

    // Data for Bar Chart
    const barData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Detections",
                data: [12, 9, 3, 5, 2],
                backgroundColor: "rgba(33, 123, 168, 0.5)",
                borderColor: "rgba(56, 149, 195, 1)",
                borderWidth: 1,
            },
        ],
    };

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

    // Data for Doughnut Chart
    const doughnutData = {
        labels: ["Recognized", "Unknown"],
        datasets: [
            {
                label: "Sales Distribution",
                data: [25, 15],
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

    // Chart Options
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

    const BarItem = ({ icon, title, value }) => {
        return (
            <div className='dashboard-bar-item'>
                <div className='value'>{value}</div>
                <div className='d-flex flex-column align-items-start'>
                    {icon}
                    <div className='small mt-2 text-truncate'>{title}</div>
                </div>
            </div>
        )
    };

    const recentDetections = [
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
        { path: "path", location: "location name", datetime: "Thu, 28 Nov 2024 15:40:58 GMT" },
    ]

    const renderRecentDetections = () => {
        return (
            <>
                {recentDetections.map((detection, index) => {
                    return (
                        <div
                            className='dashboard-detection-item'
                            key={index}
                        >
                            <div
                                className='square-item-cover my-auto'
                                style={{ width: '60px', borderRadius: '5px', marginLeft: '1.5rem' }}
                            >
                                <img
                                    src={squareApiBaseUrl + "/face/detected-face/" + encodeURIComponent(detection.path)}
                                />
                            </div>
                            <div className='ms-4 d-flex flex-column justify-content-center'>
                                <span
                                    className='fw-bold text-truncate'
                                    style={{ fontSize: '1.1rem' }}
                                >{detection.location}</span>

                                <span
                                    className=' opacity-75 text-truncate'
                                    style={{ fontSize: '12px' }}
                                >{detection.datetime}</span>
                            </div>

                        </div>

                    )
                })}

            </>
        );
    };

    return (
        <MainContainer>
            <ContentContainer
                header={<MainHeader text="Dashboard" />}
            >
                <div className='dashboard-content-area'>
                    <div className='dashboard-content-action-area'>
                        <div className='dashboard-section'>
                            <div className='dashboard-bar'>
                                <BarItem
                                    icon={<FaUserCheck size={20} />}
                                    title={"Detection's today"}
                                    value={10}
                                />
                                <BarItem
                                    icon={<FaUserFriends size={20} />}
                                    title={"Joined groups"}
                                    value={1}
                                />
                                <BarItem
                                    icon={<FaUsers size={25} />}
                                    title={"Created groups"}
                                    value={1}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-content-topleft-area'>
                        <div className='dashboard-section'>
                            {/* Bar Chart */}
                            <Bar data={barData} options={options} />
                        </div>
                    </div>
                    <div className='dashboard-content-topright-area'>
                        <div className='dashboard-section-highlight custom-scrollbar'>
                            <div className='fs-6 p-3' style={{fontWeight: '500'}}>Your recent detections</div>
                            {renderRecentDetections()}
                        </div>
                    </div>
                    <div className='dashboard-content-bottomleft-area'>
                        <div className='dashboard-section'>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>
                    <div className='dashboard-content-bottomright-area'>
                        <div className='dashboard-section'>
                            {/* Line Chart */}
                            <Line data={lineData} options={options} />
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </MainContainer>
    );
}

export default DashboardPage;
