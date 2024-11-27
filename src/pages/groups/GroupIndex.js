import React from 'react';

import GroupHeader from '../../components/headers/GroupHeader';
import SectionHeader from '../../components/headers/SectionHeader';
import LocationItem from '../../components/items/LocationItem';
import AnalyticsItem from '../../components/items/AnalyticsItem';

import { ImLocation } from "react-icons/im";

import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';

const GroupIndex = ({ locations, owner, group }) => {

    const { user } = useAuth();

    const {
        toggleCreateLocation,
    } = useLocation();

    const sampleAnalytics = [
        { name: 'Frequency' },
        { name: 'Mean' },
        { name: 'Median' },
        { name: 'Mode' },
    ];

    const renderAnalytics = () => {
        return sampleAnalytics.map((analytics, index) => {
            return (
                <AnalyticsItem
                    analytics={analytics}
                    key={index}
                />
            )
        });
    };

    const renderLocations = () => {
        return locations.map((location, index) => {
            return (
                <LocationItem
                    location={location}
                    isOwner={owner.id === user.id}
                    key={index}
                />
            )
        });
    };

    const Section = ({ title, icon, actions, content }) => {
        return (
            <>
                <SectionHeader
                    icon={icon}
                    title={title}
                    actions={actions}
                />
                {content}
            </>
        )
    };


    return (
        <>
            <div className='group-header-area'>
                <GroupHeader group={group} owner={owner} />
            </div>
            <div className='group-locations-area' >
                <Section
                    title={"Locations"}
                    icon={<ImLocation className='me-2' size={24} />}
                    actions={
                        <>
                            {owner.id === user.id && (
                                <button
                                    className={`main-button `}
                                    onClick={toggleCreateLocation}
                                >Add location</button>
                            )}
                        </>
                    }
                    content={
                        <>
                            {locations.length === 0 && (
                                <div style={{ height: '100px' }}>
                                    No locations added yet
                                </div>
                            )}
                            {locations.length > 0 && (
                                <div className='group-grid-display'>
                                    {renderLocations()}
                                </div>
                            )}
                        </>
                    }
                />
            </div >
        </>
    );
}

export default GroupIndex;
