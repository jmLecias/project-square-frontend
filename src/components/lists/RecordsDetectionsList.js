import React from 'react';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

// Mock data
const data = Array.from({ length: 20 }, (_, index) => ({
    detection: `Detection ${index + 1}`,
    datetime: new Date().toISOString(),
    location: `Location ${index + 1}`,
    user: `User ${index + 1}`,
    confidence: `${Math.random().toFixed(2) * 100}%`,
    status: index % 2 === 0 ? 'Active' : 'Inactive',
}));

const RecordsDetectionsList = () => {
    return (
        <div className="records-detections-list">
            <Table height={500} data={data} rowHeight={35}>

                {/* Detection column */}
                <Column key="detection" width={100}>
                    <HeaderCell>Detection</HeaderCell>
                    <Cell dataKey="detection" />
                </Column>

                {/* Datetime column */}
                <Column key="datetime" flexGrow={1}>
                    <HeaderCell>Datetime</HeaderCell>
                    <Cell dataKey="datetime" />
                </Column>

                {/* Location column */}
                <Column key="location" flexGrow={1}>
                    <HeaderCell>Location</HeaderCell>
                    <Cell dataKey="location" />
                </Column>

                {/* User column */}
                <Column key="user" flexGrow={1}>
                    <HeaderCell>User</HeaderCell>
                    <Cell dataKey="user" />
                </Column>

                {/* Confidence column */}
                <Column key="confidence" width={100}>
                    <HeaderCell>Confidence</HeaderCell>
                    <Cell dataKey="confidence" />
                </Column>

                {/* Status column */}
                <Column key="status" width={100}>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="status" />
                </Column>
            </Table>
        </div>
    );
};

export default RecordsDetectionsList;
