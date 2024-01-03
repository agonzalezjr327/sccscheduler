import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Label, Form, Table } from 'reactstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { PrintReport } from '../PrintReport';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import moment from 'moment';

export const MonthlyReport = () => {
    const componentRef = useRef();
    const allClasses = useSelector(state => state.getClasses.classes);
    const [payload, setPayload] = useState({});
    const [show, setShow] = useState(false);
    const [classesInMonth, setClassesInMonth] = useState([]);
    const [classHours, setClassHours] = useState(0);
    const [studentCapacity, setStudentCapacity] = useState(0);
    const [classCount, setClassCount] = useState([]);
    const [duplicateIndex, setDuplicateIndex] = useState([]);
    let count = 0;
    let totalCount = [];
    let totalHours = [];
    let totalCapacity = [];
    let monthlyClasses = 0;
    let monthlyHours = 0;
    
    const getUserData = (e) => {
        setClassesInMonth([]);
        setPayload({ ...payload, [e.target.name]: e.target.value })
    };

    const clearReport = (e) => {
        setClassesInMonth([]);
        setShow(false)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.entries(payload) < 1) return toast.error('Fill out Field', { position: 'top-center', className: 'bg-danger text-light' });
        if (moment(payload.month).isAfter(moment())) return toast.error('Month or Year is Past current Date', { position: 'top-center', className: 'bg-danger text-light' });

        let startOfMonth = moment(payload.month).startOf('month').format('L');
        let endOfMonth = moment(payload.month).endOf('month').format('L');
        allClasses.forEach(c => {
            if (moment(c.endDate).isBetween(startOfMonth, endOfMonth) || moment(c.endDate).isSame(startOfMonth) || moment(c.endDate).isSame(endOfMonth)) {
                setClassesInMonth([...classesInMonth, c])
                classesInMonth.push(c)
            }
        })

        if (classesInMonth.length < 1) return setShow(false) || toast.error('No data to show', { position: 'top-center', className: 'bg-danger text-light' });

        let sortedClasses = classesInMonth.sort((a, b) => {
            let x = a.classname.toLowerCase();
            let y = b.classname.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        let hours = [];
        let capacity = [];

        sortedClasses.forEach(a => {
            sortedClasses.forEach(b => {
                if (a.classname === b.classname) {
                    count++
                    hours.push(b.hours * b.sessions)
                    capacity.push(b.students.length)
                }
            })
            totalCount.push(count);
            count = 0;
            totalHours.push(hours.reduce((a, b) => a + b));
            totalCapacity.push(capacity.reduce((a, b) => a + b));
            hours = [];
            capacity = [];
            setClassHours(totalHours)
            setStudentCapacity(totalCapacity)
        })
        setClassCount([...totalCount])
        setClassesInMonth([...sortedClasses])
        setShow(true)
        totalCount = []
        removeDups();
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

    classesInMonth.forEach((c, key) => {
        if (duplicateIndex.includes(key) || c.classname.includes('DES') || c.classname.includes('DUI') ) {
            return
        } else {
            monthlyClasses += Number(classCount[key])
            monthlyHours += Number(classHours[key])
        }
    })

    const removeDups = () => {
        setDuplicateIndex([]);
        let removedDuplicates = [];
        let classesBucket = [];
        let bucket = [];
        classesInMonth.forEach((c, key) => {
            if (!removedDuplicates.includes(c.classname)) {
                removedDuplicates.push(c.classname)
                classesBucket.push(c)
            } else {
                bucket.push(key)
            }
        })
        setDuplicateIndex([...bucket])
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='text-primary text-center mt-5'>Monthly Report</h2>
                    <button className='btn btn-outline-success btn-lg' onClick={handlePrint}> Print</button>
                    <button className='btn btn-outline-danger btn-lg ms-3' onClick={clearReport}> Clear</button>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className='d-flex justify-content-between align-items-center w-100 flex-column'>

                        <Label for='month' className='mr-2 text-secondary m-2'>Month / Year</Label>
                        <input className='form-control w-25' type="month" name="month" id="month" onChange={getUserData} required />

                    </Col>
                </Row>
                <Row>
                    <Col className='text-center mt-3'>
                        <button className='btn btn-outline-primary btn-lg'><FaSignInAlt /> Select Month and Year</button>
                    </Col>
                </Row>
            </Form>

            {show && (
                <div>
                    <h1 className='my-5'>{moment(payload.month).format('MMMM')} Report</h1>
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
                            Capacity
                        </th>
                        <th>
                            Students
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {classesInMonth.map((c, key) => {
                        {
                            if (duplicateIndex.includes(key) || c.classname.includes('DES') || c.classname.includes('DUI')) {
                                return
                            }else{
                                return (
                                    <tr>
                                        <td><b>{c.classname}</b> </td>
                                        <td><b>{classCount[key]}</b> </td>
                                        <td><b>{classHours[key]}</b></td>
                                        <td><b>{studentCapacity[key]}</b></td>
                                        <td><b>{studentCapacity[key]}</b></td>
                                    </tr>
                                )
                            }
                        }
                    })}
                </tbody>
            </Table>
                    <Table className='table-hover table-striped table-responsive'>
                        <thead className=''>
                            <tr>
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
                            </tr>
                        </thead>
                        <tbody>
                            {classesInMonth.map((classInfo, key) => {
                                if(classInfo.classname.includes('DES')) return
                                return (
                                    <tr key={key}>
                                        <td>
                                            {classInfo.classname}
                                        </td>
                                        <td>

                                            {moment(classInfo.startDate).format('L')}

                                        </td>
                                        <td>{moment(classInfo.endDate).format('L')}</td>
                                        <td>
                                            {classInfo.hours}hr
                                        </td>
                                        <td>
                                            {(Number(classInfo.sessions) / Number(classInfo.days.length)).toFixed(1)}
                                        </td>
                                        <td>
                                            {classInfo.sessions}
                                        </td>
                                        <td>
                                            {((Number(classInfo.sessions) / Number(classInfo.days.length)) * Number(classInfo.hours)).toFixed(1)} hr
                                        </td>
                                        <td>
                                            {Number(classInfo.sessions) * Number(classInfo.hours)} hr
                                        </td>
                                        <td>
                                            {classInfo.students.length}
                                        </td>
                                        <td>
                                            {classInfo.students.length}
                                        </td>
                                        <td>
                                            {formatTime(classInfo.startTime)}
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                    <Table className='table-hover table-striped table-responsive'>
                        <thead>
                            <tr>
                                <th>
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
                            </tr>
                        </thead>
                        <tbody>
                            {classesInMonth.forEach((c, key) => {
                                {
                                    if (duplicateIndex.includes(key) || c.classname.includes('DES')) {
                                    } else {
                                        return (
                                            <tr>
                                                <td>{c.classname}</td>
                                                <td>{classCount[key]} </td>
                                                <td>{classHours[key]}</td>
                                                <td>{studentCapacity[key]}</td>
                                                <td>{studentCapacity[key]}</td>
                                            </tr>
                                        )
                                    }
                                }
                            })}
                            <tr>
                                <td><b>Total</b></td>
                                <td><b>{monthlyClasses}</b></td>
                                <td><b>{monthlyHours}</b></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
            <PrintReport classesInMonth={classesInMonth} duplicateIndex={duplicateIndex} month={moment(payload.month).format('MMMM')} formatTime={formatTime} classCount={classCount} classHours={classHours} studentCapacity={studentCapacity} ref={componentRef} isGraduation={false} monthlyClasses={monthlyClasses} monthlyHours={monthlyHours} />
        </Container>
    );
};