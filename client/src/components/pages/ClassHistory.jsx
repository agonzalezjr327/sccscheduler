import React from 'react';
import { Container, Table, Badge } from 'reactstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const ClassHistory = () => {
    const completedClasses = useSelector(state => state.getClasses.completedClasses);

    function formatTime(dateObject) {
        // remove colon in time 01:00
        let r = dateObject.split(":");
        // if time is less than 10 than it will appear like 09:00am
        // so I remove the 0 with if statement
        if (r[0] < 10) {
            let d = r[0].split('0')
            d.shift()
            r[0] = d
        }

        const parts = {
            // if over 12, minus by 12 so it wont appear in military time
            hour: Number(r[0]) < 13 ? r[0] : Number(r[0]) - 12,
            minute: r[1],
            amOrPm: Number(r[0]) < 12 ? "AM" : "PM",
        };

        return `${parts.hour}:${parts.minute} ${parts.amOrPm}`;
    }

    return (
        <Container fluid='true' className='pb-3 user-select-none'>
            <h1>Class History</h1>
            <Table className="table-hover table-striped">
                <thead className=''>
                    <tr>
                        <th>Class</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {completedClasses.map((classInfo, key) => (
                        <tr key={key}>
                            <td>
                                <details>
                                    <summary>
                                        <span className='d-flex justify-content-between w-75'>{classInfo.classname}<Badge>{classInfo.students.length}</Badge></span>
                                    </summary>
                                    <Table className="table-hover table-striped table-responsive">
                                        <tr>
                                            <th>
                                                <span>ADC</span>
                                            </th>
                                            <th>
                                                <span>Name</span>
                                            </th>
                                            <th>
                                                <span>Bed</span>
                                            </th>
                                            <th>
                                                <span>Release Date</span>
                                            </th>
                                        </tr>
                                        {classInfo.students.map((s, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{s.adc}</td>
                                                    <td>{s.name}</td>
                                                    <td>{s.bedSpace}</td>

                                                    <td>{moment(s.releaseDate).format('L')}</td>
                                                </tr>
                                            )
                                        })}
                                    </Table>
                                </details>
                            </td>
                            <td>
                                {classInfo.classroom}
                            </td>
                            <td>

                                {moment(classInfo.startDate).format('L')}
                                <br />
                                {moment(classInfo.endDate).format('L')}
                            </td>
                            <td>

                                {formatTime(classInfo.startTime)}
                                <br />
                                {formatTime(classInfo.endTime)}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};