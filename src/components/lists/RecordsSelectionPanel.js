import React, { useEffect } from 'react';

import { Accordion, Tabs } from 'rsuite';

import { FaMapLocationDot } from "react-icons/fa6";

import { useAuth } from '../../hooks/useAuth';
import { useGroup } from '../../hooks/useGroup';
import { useLocation } from '../../hooks/useLocation';

const RecordsSelectionPanel = () => {
    let isFetching = false;

    const { user } = useAuth();
    const {
        joinedGroups,
        createdGroups,
        getCreatedGroups,
        getJoinedGroups,
        reload
    } = useGroup();
    const {
        getGroupLocations,
    } = useLocation();

    useEffect(() => {
        if (
            !isFetching &&
            user
        ) {
            isFetching = true;
            try {
                getJoinedGroups(user.id).then(() => { isFetching = false; });
                getCreatedGroups(user.id).then(() => { isFetching = false; });
            } catch (error) {
                console.error(error);
            }
        }
    }, [user, reload]);

    const SelectionItem = ({ location }) => {
        return (
            <div className='selection-item'>
                <FaMapLocationDot size={20}/>
                <div
                    className='fw-bold ms-2 text-truncate'
                    title={location.name}
                >
                    {location.name}
                </div>
            </div>
        )
    }


    const renderCreatedGroups = () => {
        return createdGroups.map((group, index) => {
            return (
                <Accordion.Panel header={group.name} eventKey={index + 1}>
                    <div className='records-groups-grid-display'>
                        {group.locations.length === 0 && (
                            <div>No locations</div>
                        )}
                        {group.locations.map((location, i) => {
                            return (
                                <SelectionItem
                                    location={location}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                </Accordion.Panel>
            )
        });
    };

    const renderJoinedGroups = () => {
        return joinedGroups.map((group, index) => {
            return (
                <Accordion.Panel header={group.name} eventKey={index + 1}>
                    <div className='records-groups-grid-display'>
                        {group.locations.length === 0 && (
                            <div>No locations</div>
                        )}
                        {group.locations.map((location, i) => {
                            return (
                                <SelectionItem
                                    location={location}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                </Accordion.Panel>
            )
        });
    };



    return (
        <div className="records-selection-panel">
            <Tabs defaultActiveKey="1" appearance="subtle" style={{padding: '1rem'}}> 
                <Tabs.Tab eventKey="1" title="Created Groups">
                    <Accordion defaultActiveKey={1}>
                        {renderCreatedGroups()}
                    </Accordion>
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Joined Groups">
                    <Accordion defaultActiveKey={1}>
                        {renderJoinedGroups()}
                    </Accordion>
                </Tabs.Tab>
            </Tabs>
        </div>
    );
};

export default RecordsSelectionPanel;