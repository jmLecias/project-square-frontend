import React, { useEffect, useState } from 'react';
import { Loader } from 'rsuite';

import { FaUserCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainHeader from '../../components/headers/MainHeader';

import DashboardDetectionsList from '../../components/lists/DashboardDetectionsList';
import BarGraph from '../../components/graphs/BarGraph';
import LineGraph from '../../components/graphs/LineGraph';
import DoughnutGraph from '../../components/graphs/DoughnutGraph';

import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';

const DashboardPage = () => {
    const { getDashboardData, reload } = useDashboard();
    const { user } = useAuth();

    const navigate = useNavigate();

    let isFetching = false;

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        if (!isFetching) {
            isFetching = true;

            getDashboardData(user.id)
                .then((res) => {
                    setDashboardData(res.dashboard_data);
                })
                .catch((e) => {
                    console.log("Error while getting location cameras data: " + e);
                })
                .finally(() => {
                    isFetching = false;
                });
        }

        return () => {
            setDashboardData(null);
        };
    }, [reload]);



    const BarItem = ({ icon, title, value, onClick }) => {
        return (
            <div 
                className='dashboard-bar-item cursor-pointer' 
                onClick={onClick}
                title={title}
            >
                <div className='value'>{value}</div>
                <div 
                    className='d-flex flex-column align-items-start'
                >
                    {icon}
                    <div className='title small mt-2 text-truncate'>{title}</div>
                </div>
            </div>
        )
    };


    return (
        <MainContainer>
            {dashboardData ? (
                <ContentContainer
                    header={<MainHeader text="Dashboard" />}
                >
                    <div className='dashboard-content-area'>
                        <div className='dashboard-content-action-area'>
                            <div className='dashboard-section' style={{padding: '0'}}>
                                <div className='dashboard-bar'>
                                    <BarItem
                                        icon={<FaUserCheck size={20} />}
                                        title={"Detection's today"}
                                        value={dashboardData.detections_count}
                                        onClick={() => navigate('/records')}
                                    />
                                    <BarItem
                                        icon={<FaUserFriends size={20} />}
                                        title={"Joined groups"}
                                        value={dashboardData.joined_count}
                                        onClick={() => navigate('/groups')}
                                    />
                                    <BarItem
                                        icon={<FaUsers size={25} />}
                                        title={"Created groups"}
                                        value={dashboardData.created_count}
                                        onClick={() => navigate('/groups')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-content-topleft-area'>
                            <div className='dashboard-section'>
                                <BarGraph data={dashboardData.bar_data} />
                            </div>
                        </div>
                        <div className='dashboard-content-topright-area'>
                            <div className='dashboard-section-highlight custom-scrollbar'>
                                <DashboardDetectionsList detections={dashboardData.recent_detections} />
                            </div>
                        </div>
                        <div className='dashboard-content-bottomleft-area'>
                            <div className='dashboard-section'>
                                <DoughnutGraph data={dashboardData.doughnut_data}/>
                            </div>
                        </div>
                        <div className='dashboard-content-bottomright-area'>
                            <div className='dashboard-section'>
                                <LineGraph data={dashboardData.line_data}/>
                            </div>
                        </div>
                    </div>
                </ContentContainer>
            ) : (
                <Loader center speed='slow' size='lg' />
            )}
        </MainContainer>
    );
}

export default DashboardPage;
