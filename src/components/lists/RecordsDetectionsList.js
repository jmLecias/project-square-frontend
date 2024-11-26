import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'rsuite';

import { useRecords } from '../../hooks/useRecords';
import { useAuth } from '../../hooks/useAuth';

const { Column, HeaderCell, Cell } = Table;

const RecordsDetectionsList = ({ }) => {
    const { getUserRecords } = useRecords();
    const { user } = useAuth();

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserRecords(user.id, currentPage, pageSize)
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
    }, [currentPage, pageSize]);


    return (
        <div className="records-detections-list custom-scrollbar-hidden">
            <Table
                height={450}
                data={data}
                rowHeight={40}
                style={{ minWidth: '800px' }}
                loading={loading}
            >
                <Column key="detection" flexGrow={0.5}>
                    <HeaderCell>Detection</HeaderCell>
                    <Cell dataKey="detection" />
                </Column>

                <Column key="datetime" flexGrow={1.40}>
                    <HeaderCell>Datetime</HeaderCell>
                    <Cell dataKey="datetime" />
                </Column>

                <Column key="location" flexGrow={0.75}>
                    <HeaderCell>Location</HeaderCell>
                    <Cell dataKey="location" />
                </Column>

                <Column key="user" flexGrow={1}>
                    <HeaderCell>User</HeaderCell>
                    <Cell dataKey="user" />
                </Column>

                <Column key="confidence" flexGrow={0.25}>
                    <HeaderCell>Confidence</HeaderCell>
                    <Cell dataKey="confidence" />
                </Column>

                <Column key="status" flexGrow={0.6}>
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
                style={{ minWidth: '500px' }}
                layout={['total', '-', 'limit', '|', 'pager']}
                limitOptions={[5, 10, 20]}
            />
        </div>
    );
};

export default RecordsDetectionsList;
