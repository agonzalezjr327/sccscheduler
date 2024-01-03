import React from 'react';
import { Table, Badge } from 'reactstrap';
import { getClassInfo } from '../../reducers/getClassesSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
;
export const ClassesTable = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedClass = (id) => {
        let payload = {
            courseId: id,
        };
        dispatch(getClassInfo(payload));

        navigate(`/selectedclass`);
    };

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
        <>

            <Table className="table-hover table-striped user-select-none">
                <thead className=''>
                    <tr>
                        <th>Class</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Days</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((classInfo, key) => (
                        <tr className="" key={key}>
                            <td>
                                <button
                                    className="btn btn-outline-dark w-75 d-flex justify-content-between align-items-end"
                                    onClick={(e) => selectedClass(classInfo._id)}
                                >{classInfo.classname}{' '}
                                    <Badge>{classInfo.students.length}</Badge>
                                </button>
                            </td>
                            <td>
                                {classInfo.classroom}
                            </td>
                            <td>

                                {moment(classInfo.startDate).format('L')}
                                <br />
                                {moment(new Date()).valueOf() < moment(classInfo.endDate).valueOf() ? moment(classInfo.endDate).format('L') : <b className='text-danger'>{moment(classInfo.endDate).format('L')}</b>}
                            </td>
                            <td>

                                {formatTime(classInfo.startTime)}
                                <br />
                                {formatTime(classInfo.endTime)}

                            </td>
                            <td>{classInfo.days.map((day, key) => {
                                if(day === moment().format('dddd')){
                                    return <span className='text-danger' key={key}><b>{day}</b> </span>;
                                } else {
                                    return day + ' ';
                                }
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    );
};