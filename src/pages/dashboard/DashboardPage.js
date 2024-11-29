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
        {
            "id": 1082,
            "datetime": "2024-11-29 02:59:26",
            "type_id": null,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 89.5,
            "origin_path": "faces/captures/2024-11-28T185925.5398860000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T185925.5398860000_location_21.png)-1732820368.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1086,
            "datetime": "2024-11-29 03:11:11",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 88.25,
            "origin_path": "faces/captures/2024-11-28T191110.8810560000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191110.8810560000_location_21.png)-1732821073.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1087,
            "datetime": "2024-11-29 03:11:16",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 88.44,
            "origin_path": "faces/captures/2024-11-28T191115.9020620000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191115.9020620000_location_21.png)-1732821078.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1092,
            "datetime": "2024-11-29 03:17:55",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 89.32,
            "origin_path": "faces/captures/2024-11-28T191755.3584550000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191755.3584550000_location_21.png)-1732821478.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1102,
            "datetime": "2024-11-29 03:18:53",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 76.94,
            "origin_path": "faces/captures/2024-11-28T191853.3134620000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191853.3134620000_location_21.png)-1732821535.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1103,
            "datetime": "2024-11-29 03:18:58",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 87.63,
            "origin_path": "faces/captures/2024-11-28T191858.3374540000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191858.3374540000_location_21.png)-1732821541.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1104,
            "datetime": "2024-11-29 03:19:03",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 87.45,
            "origin_path": "faces/captures/2024-11-28T191903.3584570000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191903.3584570000_location_21.png)-1732821546.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        },
        {
            "id": 1105,
            "datetime": "2024-11-29 03:19:08",
            "type_id": null,
            "location_id": 21,
            "location": "John Mark's Location",
            "user_id": 50,
            "confidence": 88.84,
            "origin_path": "faces/captures/2024-11-28T191908.4734600000_location_21.png",
            "detected_path": "faces/detections/face_1(2024-11-28T191908.4734600000_location_21.png)-1732821551.jpg",
            "status_id": 2,
            "identity_key": "ffaa7972-0ccd-44e4-84d5-e80e2771fd31"
        }
    ];

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
                                    src={squareApiBaseUrl + "/face/detected-face/" + encodeURIComponent(detection.detected_path)}
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
                            <div className='fs-6 p-3' style={{ fontWeight: '500' }}>Your recent detections</div>
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
