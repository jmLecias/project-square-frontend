import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'rsuite';

import RecordsActionBar from '../bars/RecordsActionBar';

import { squareApiBaseUrl } from '../../api/square_api';

import { useRecords } from '../../hooks/useRecords';
import { useAuth } from '../../hooks/useAuth';

const { Column, HeaderCell, Cell } = Table;

const RecordsLocationDetectionsList = ({ location, currentUser }) => {
    const { getLocationRecords, getLocationUserRecords } = useRecords();
    const { user } = useAuth();

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if(location.owner_id === user.id) {
            if (currentUser) {
                getLocationUserRecords(location.id, currentUser.id, currentPage, pageSize)
                    .then((result) => {
                        setData(result.detections);
                        setTotalRecords(result.pagination.total_records);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                getLocationRecords(location.id, currentPage, pageSize)
                    .then((result) => {
                        setData(result.detections);
                        setTotalRecords(result.pagination.total_records);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            // WHen use is not the owner of the Location
            getLocationUserRecords(location.id, user.id, currentPage, pageSize)
                .then((result) => {
                    setData(result.detections);
                    setTotalRecords(result.pagination.total_records);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [currentPage, pageSize, currentUser]);

    const ImageCell = ({ rowData, dataKey, ...props }) => {
        return (
            <Cell {...props} style={{ padding: 0 }}>
                <div
                    style={{
                        width: 45,
                        aspectRatio: '1 / 1',
                        background: '#f5f5f5',
                        borderRadius: 6,
                        margin: '7px',
                        marginLeft: '15px',
                        overflow: 'hidden',
                        display: 'inline-block',
                        border: '1px solid white',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={squareApiBaseUrl + "/face/detected-face/" + encodeURIComponent(rowData.detection)}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                </div>
            </Cell>
        )
    };

    return (
        <>
            <RecordsActionBar title={`${currentUser ? 'Records of ' + currentUser.name : 'Location records'}`} />

            <div className="records-detections-list custom-scrollbar-hidden">
                <Table
                    height={450}
                    data={data}
                    rowHeight={60}
                    style={{ minWidth: '500px' }}
                    loading={loading}
                >
                    <Column key="detection" flexGrow={0.4}>
                        <HeaderCell>Detection</HeaderCell>
                        <ImageCell dataKey="detection" />
                    </Column>

                    <Column key="datetime" flexGrow={1}>
                        <HeaderCell>Datetime</HeaderCell>
                        <Cell dataKey="datetime" />
                    </Column>

                    <Column key="location" flexGrow={0.5}>
                        <HeaderCell>Location</HeaderCell>
                        <Cell dataKey="location" />
                    </Column>

                    <Column key="user" flexGrow={0.7}>
                        <HeaderCell>User</HeaderCell>
                        <Cell dataKey="user" />
                    </Column>

                    <Column key="confidence" flexGrow={0.25}>
                        <HeaderCell>Confidence</HeaderCell>
                        <Cell dataKey="confidence" />
                    </Column>

                    <Column key="status" flexGrow={0.5}>
                        <HeaderCell>Status</HeaderCell>
                        <Cell dataKey="status" />
                    </Column>
                </Table>


                <Pagination
                    total={totalRecords}
                    limit={pageSize}
                    prev={true}
                    next={true}
                    first={true}
                    last={true}
                    maxButtons={5}
                    activePage={currentPage}
                    onChangePage={setCurrentPage}
                    onChangeLimit={(newLimit) => {
                        setPageSize(newLimit);
                        setCurrentPage(1);
                    }}
                    className="mt-2"
                    style={{ minWidth: '500px', width: '100%' }}
                    layout={['total', '-', 'limit', '|', 'pager']}
                    limitOptions={[5, 10, 20]}
                />
            </div>

        </>
    );
};

export default RecordsLocationDetectionsList;