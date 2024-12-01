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

import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';

const DashboardPage = () => {
    const { getDashboardData, reload } = useDashboard();
    const { user } = useAuth();

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


    return (
        <MainContainer>
            {dashboardData ? (
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
                                        value={dashboardData.detections_count}
                                    />
                                    <BarItem
                                        icon={<FaUserFriends size={20} />}
                                        title={"Joined groups"}
                                        value={dashboardData.joined_count}
                                    />
                                    <BarItem
                                        icon={<FaUsers size={25} />}
                                        title={"Created groups"}
                                        value={dashboardData.created_count}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-content-topleft-area'>
                            <div className='dashboard-section'>
                                <BarGraph data={dashboardData.bar_data}/>
                            </div>
                        </div>
                        <div className='dashboard-content-topright-area'>
                            <div className='dashboard-section-highlight custom-scrollbar'>
                                <DashboardDetectionsList detections={dashboardData.recent_detections}/>
                            </div>
                        </div>
                        <div className='dashboard-content-bottomleft-area'>
                            <div className='dashboard-section'>
                                <DoughnutGraph />
                            </div>
                        </div>
                        <div className='dashboard-content-bottomright-area'>
                            <div className='dashboard-section'>
                                <LineGraph />
                            </div>
                        </div>
                    </div>
                </ContentContainer>
            ) : (
                <Loader center speed='slow' size='lg'/>
            )}
        </MainContainer>
    );
}

export default DashboardPage;
