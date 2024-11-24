import React from 'react';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, ColumnGroup } = Table;

// Create data with 31 rows for days
const data = Array.from({ length: 31 }, (_, index) => ({
    days: index + 1,
    amArrival: '',
    amDeparture: '',
    pmArrival: '',
    pmDeparture: '',
    undertimeHrs: '',
    undertimeMins: '',
    overtimeHrs: '',
    overtimeMins: '',
}));

const RecordsDailyList = () => {
    return (
        <div className="records-daily-list">
            <div className='fw-bold mb-2'>Daily records</div>

            <Table 
                height={350} 
                data={data} 
                rowHeight={35} 
                cellBordered={true}
                bordered
                headerHeight={70}
            >
                {/* Days column */}
                <Column key="days" width={50} fixed>
                    <HeaderCell>Days</HeaderCell>
                    <Cell dataKey="days" />
                </Column>

                {/* AM Column */}
                <ColumnGroup header="AM">
                    <Column key="amArrival" width={100}>
                        <HeaderCell>Arrival</HeaderCell>
                        <Cell dataKey="amArrival" />
                    </Column>
                    <Column key="amDeparture" width={100}>
                        <HeaderCell>Departure</HeaderCell>
                        <Cell dataKey="amDeparture" />
                    </Column>
                </ColumnGroup>

                {/* PM Column */}
                <ColumnGroup header="PM">
                    <Column key="pmArrival" width={100}>
                        <HeaderCell>Arrival</HeaderCell>
                        <Cell dataKey="pmArrival" />
                    </Column>
                    <Column key="pmDeparture" width={100}>
                        <HeaderCell>Departure</HeaderCell>
                        <Cell dataKey="pmDeparture" />
                    </Column>
                </ColumnGroup>

                {/* UNDERTIME Column */}
                <ColumnGroup header="UNDERTIME">
                    <Column key="undertimeHrs" width={80}>
                        <HeaderCell>Hrs</HeaderCell>
                        <Cell dataKey="undertimeHrs" />
                    </Column>
                    <Column key="undertimeMins" width={80}>
                        <HeaderCell>Mins</HeaderCell>
                        <Cell dataKey="undertimeMins" />
                    </Column>
                </ColumnGroup>

                {/* OVERTIME Column */}
                <ColumnGroup header="OVERTIME">
                    <Column key="overtimeHrs" width={80}>
                        <HeaderCell>Hrs</HeaderCell>
                        <Cell dataKey="overtimeHrs" />
                    </Column>
                    <Column key="overtimeMins" width={80}>
                        <HeaderCell>Mins</HeaderCell>
                        <Cell dataKey="overtimeMins" />
                    </Column>
                </ColumnGroup>
            </Table>
        </div>
    );
};

export default RecordsDailyList;
