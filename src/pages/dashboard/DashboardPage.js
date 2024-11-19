import React from 'react';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainHeader from '../../components/headers/MainHeader';

// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

const DashboardPage = () => {

    return (
        <MainContainer>
            <ContentContainer
                header={<MainHeader text="Dashboard" />}
            >
                <div className='dashboard-content-area'>
                    <div className='dashboard-content-action-area'>
                        <div className='dashboard-section'>

                        </div>
                    </div>
                    <div className='dashboard-content-topleft-area'>
                        <div className='dashboard-section'>

                        </div>
                    </div>
                    <div className='dashboard-content-topright-area'>
                        <div className='dashboard-section-highlight'>

                        </div>
                    </div>
                    <div className='dashboard-content-bottomleft-area'>
                        <div className='dashboard-section'>

                        </div>
                    </div>
                    <div className='dashboard-content-bottomright-area'>
                        <div className='dashboard-section'>

                        </div>
                    </div>
                </div>
            </ContentContainer>
        </MainContainer>
    );
}

export default DashboardPage;
