import React, { Fragment } from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';

export const PrintReport = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className='d-none d-print-flex flex-column container m-3'>
             <h1 className='my-5'>{props.month} Report {props.isGraduation && 'for Graduation'}</h1>
             <Table className='table-hover table-striped table-responsive mt-5'>
                <thead>
                    <tr>
                        <th>
                            Class
                        </th>
                        <th>
                            # of Classes
                        </th>
                        <th>
                            Hours
                        </th>
                        <th>
                        {props.isGraduation && 'Capacity'}
                        </th>
                        <th>
                        {props.isGraduation && 'Students'} 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {props.classesInMonth.map((c, key) => {
                        {
                            if (props.duplicateIndex.includes(key)) {
                            } else {
                                return (
                                    <tr>
                                        <td><b>{c.classname}</b> </td>
                                        <td><b>{props.classCount[key]}</b> </td>
                                        <td><b>{props.classHours[key]}</b></td>
                                        <td><b>{props.studentCapacity[key]}</b></td>
                                        <td><b>{props.studentCapacity[key]}</b></td>
                                    </tr>
                                )
                            }
                        }
                    })} */}
                    {!props.isGraduation && (
                        <tr>
                            <td><b>Total</b></td>
                            <td><b>{props.monthlyClasses}</b></td>
                            <td><b>{props.monthlyHours}</b></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </Table>
           
            <Table className='table-hover table-striped table-responsive my-5'>
                <thead className=''>
                  {<tr>
                        <th>Class</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Time per Session</th>
                        <th>Sessions @ Week</th>
                        <th>Total Sessions</th>
                        <th>Hours @ Week</th>
                        <th>Total Hours</th>
                        <th>Capacity</th>
                        <th>Enrolled</th>
                        <th>Times</th>
                    </tr>}
                </thead>
                <tbody>
                    {props.classesInMonth.map((classInfo, key) => {
                        if(classInfo.classname.includes('DES') || classInfo.classname.includes('DUI')) return
                        return (
                            <Fragment key={key}>
                                <tr>
                                    <td>
                                        <b>{classInfo.classname}</b>
                                    </td>
                                    <td>
                                        <b>{moment(classInfo.startDate).format('L')}</b>
                                    </td>
                                    <td><b>{moment(classInfo.endDate).format('L')}</b></td>
                                    <td>
                                        <b>{classInfo.hours}hr</b>
                                    </td>
                                    <td>
                                        <b>{(Number(classInfo.sessions) / Number(classInfo.days.length)).toFixed(1)}</b>
                                    </td>
                                    <td>
                                        <b>{classInfo.sessions}</b>
                                    </td>
                                    <td>
                                        <b>{((Number(classInfo.sessions) / Number(classInfo.days.length)) * Number(classInfo.hours)).toFixed(1)} hr</b>
                                    </td>
                                    <td>
                                        <b>{Number(classInfo.sessions) * Number(classInfo.hours)} hr</b>
                                    </td>
                                    <td>
                                        <b>{classInfo.students.length}</b>
                                    </td>
                                    <td>
                                        <b>{classInfo.students.length}</b>
                                    </td>
                                    <td>
                                        <b>{props.formatTime(classInfo?.startTime)}</b>
                                    </td>
                                </tr>
                                {props.isGraduation && classInfo?.students.map((s, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{s.adc}</td>
                                            <td>{s.name}</td>
                                            <td>Release {moment(s.releaseDate).format('L')}</td>
                                        </tr>
                                    )
                                })}
                            </Fragment>
                        )
                    })}

                </tbody>
            </Table>

            <Table className='table-hover table-striped table-responsive mt-5'>
                        <thead className='my-5'>
                            {/* <tr> */}
                                {/* <th>
                                  TOTALS
                                </th>
                                <th>
                                    # of Classes
                                </th>
                                <th>
                                    Hours
                                </th>
                                <th>
                                   
                                </th>
                                <th>
                                    
                                </th>
                            </tr> */}
                        </thead>
                        <tbody>
                            {props.classesInMonth.forEach((c, key) => {
                                {
                                    if (props.duplicateIndex.includes(key) || c.classname.includes('DES') || c.classname.includes('DUI')) {
                                    } else {
                                        return (
                                            <tr>
                                                <td>{c.classname}</td>
                                                <td>{props.classCount[key]} </td>
                                                <td>{props.classHours[key]}</td>
                                                <td>{props.studentCapacity[key]}</td>
                                                <td>{props.studentCapacity[key]}</td>
                                            </tr>
                                        )
                                    }
                                }
                            })}
                            {/* <tr className='mt-5'>
                                <td><b>Total</b></td>
                                <td><b>{props.monthlyClasses}</b></td>
                                <td><b>{props.monthlyHours}</b></td>
                                <td></td>
                                <td></td>
                            </tr> */}
                        </tbody>
                    </Table>
            
        </div>
    );
});
