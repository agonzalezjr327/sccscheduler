import React, { useState } from 'react';
import { Container, Row, Col, Table, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from '../../reducers/modalSlice';
import { checkClassConflict, checkStudentConflict } from "../../utils/conflicts";
import { toast } from 'react-toastify';
import { getCreatedClass } from '../../reducers/getStudentsSlice';
import moment from 'moment';

export const CreateClass = () => {
    const dispatch = useDispatch();
    const rssList = useSelector(state => state.getStudents.rssList);
    let soonToRelease = useSelector(state => state.getStudents.selectedClass);
    const allStudents = useSelector(state => state.getStudents.isActive);
    const allClasses = useSelector(state => state.getClasses.classes);
    const requiredClasses = useSelector(state => state.getClasses.requiredClasses);
    const tradeClasses = useSelector(state => state.getClasses.tradeClasses);
    const [payload, setPayload] = useState({});
    const [isHidden, setIsHidden] = useState(true);
    const [isRequired, setIsRequired] = useState(false);
    const [isTrade, setIsTrade] = useState(false);
    let week = [];
    let studentsInClass = [];
    // had to code below to remove duplicates 
    let r = new Set(soonToRelease)
    soonToRelease = [...r]

    const addingToWeek = (day) => {
        if (week.includes(day)) {
            let newWeek = week.filter((remove) => remove !== day);
            week = newWeek;
        } else {
            week.push(day);
        }
        payload.days = week.sort();
        let sortedWeek = [];
        payload.days.map((d) => {
            let days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ];
            return sortedWeek.push(days[d]);
        });
        payload.days = sortedWeek
    };

    const addingToClass = (student) => {
        if (studentsInClass.includes(student)) {
            let newStudent = studentsInClass.filter((remove) => remove !== student);
            studentsInClass = newStudent;
        } else {
            studentsInClass.push(student);
        }

        payload.students = studentsInClass;
    };

    const getUserData = (e) => {
        if (payload.instructor === undefined) payload.instructor = [];
        if (e.target.checked && e.target.name === 'isRequired') return setPayload({ ...payload, isRequired: true })
        if (!e.target.checked && e.target.name === 'isRequired') return setPayload({ ...payload, isRequired: false })
        if (e.target.checked && e.target.name === 'isTrade') return setPayload({ ...payload, isTrade: true })
        if (!e.target.checked && e.target.name === 'isTrade') return setPayload({ ...payload, isTrade: false })
        if (e.target.checked && e.target.name === 'instructor') return payload.instructor.push(e.target.value);
        if (!e.target.checked && e.target.name === 'instructor') return payload.instructor = payload.instructor.filter(i => i !== e.target.value);
        setPayload({ ...payload, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.entries(payload).length < 1) return toast.error('Fill out Fields', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.startTime === undefined) return toast.error('Fill out Start Time', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.endTime === undefined) return toast.error('Fill out End Time', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.startDate === undefined) return toast.error('Fill out Start Date', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.endDate === undefined) return toast.error('Fill out End Date', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.sessions === undefined) return toast.error('Fill out Sessions', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.hours === undefined) return toast.error('Fill out Hours', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.classroom === undefined) return toast.error('Fill out Class Room', { position: 'top-center', className: 'bg-danger text-light' });
        if(payload.days === undefined) return toast.error('Fill out Days', { position: 'top-center', className: 'bg-danger text-light' });
        if (moment(payload.startDate).valueOf() > moment(payload.endDate).valueOf()) return toast.error('Start date cannot be after end date')
  
        let studentConflict = checkStudentConflict(payload.startDate, payload.startTime, payload.endDate, payload.endTime, payload.days, payload.students, allStudents);

        let classConflict = checkClassConflict(payload.startDate, payload.startTime, payload.endDate, payload.endTime, payload.classroom, allClasses, payload.days
        );

        const message = (
            <section className="text-center">
                <h5>Update {payload.classname}</h5>
                <p className="my-4 text-larger">
                    Confirm to Update
                </p>
            </section>
        );

        const payloads = {
            message: message,
            type: 'createclass',
            payload: payload,
            studentConflict: studentConflict,
            classConflict: classConflict
        }
        dispatch(openModal(payloads));
        setIsHidden(students => true);
    };

    const handleSelectStudents = (e) => {
        if (payload.classname === undefined) return toast.error('Please fill out Class Name');
        dispatch(getCreatedClass(payload.classname))
        setIsHidden(students => false)
        requiredClasses.includes(payload.classname) && setIsRequired(true)
        tradeClasses.includes(payload.classname) && setIsTrade(true)
    }

    return (
        <Container className='user-select-none'>
            <Row>
                <Col>
                    <h1 className='text-center my-5 text-primary'>Create Class</h1>
                </Col>
            </Row>
            <datalist id='classname'>
                {
                   requiredClasses.map((course, key) => {
                        return (
                            <option value={course} key={key}>{course}</option>
                        )
                    })
                }
            </datalist>
            <datalist id="classroom">
                {['Classroom 6', 'Dorm 8', 'Kitchen', 'DES', 'Visitation', 'GYM', 'HVAC', 'Library', 'Chow Hall', 'Classroom 1', 'Classroom 2', 'Classroom 3', 'Classroom 4', 'Classroom 5', 'Dorm 1', 'Dorm 2', 'Dorm 3', 'Dorm 4', 'Dorm 5', 'Dorm 6', 'Dorm 7', 'Rec Yard'].map(room => {
                    return <option value={room}>{room}</option>
                })}

            </datalist>
            <Row>
                <Col className='d-flex flex-column align-items-center'>
                    <label htmlFor="classname">
                        <b>Class Name</b>
                    </label>
                    <input type="text" name="classname" id="classname" list='classname' className='form-control w-75 mt-1' onChange={getUserData} />
                    <label htmlFor="classroom" className='mt-4'>
                        <b>Class Room</b>
                    </label>
                    <input type="text" name="classroom" id="classroom" list='classroom' className='form-control w-75 mt-1' onChange={getUserData} />

                </Col>
                <Col xs={2} className="d-flex flex-column">
                    <label htmlFor="startDate">
                        <b>Start Date</b>
                    </label>
                    <input className='w-100 mt-1 form-control' type="date" name="startDate" id="startDate" onChange={getUserData} />
                    <label htmlFor="endDate" className='mt-4'>
                        <b>End Date</b>
                    </label>
                    <input type="date" name="endDate" id="endDate" className="w-100 mt-1 form-control" onChange={getUserData} />
                </Col>
                <Col xs={2} className="d-flex flex-column">
                    <label htmlFor="startTime">
                        <b>Start Time</b>
                    </label>
                    <input type="time" name="startTime" id="startTime" className="w-100 mt-1 form-control" onChange={getUserData} />
                    <label htmlFor="endTime" className='mt-4'>
                        <b>End Time</b>
                    </label>
                    <input type="time" className='w-100 mt-1 form-control' name='endTime' id='endTime' onChange={getUserData} />
                </Col>
                <Col xs={2} className="d-flex flex-column">
                    <label htmlFor="sessions">
                        <b>Sessions</b>
                    </label>
                    <input type="number" className='w-100 mt-1 form-control' name='sessions' id='sessions' onChange={getUserData} />
                    <label htmlFor="hours" className='mt-4'>
                        <b>
                            Hours
                        </b>
                    </label>
                    <input type="number" className='w-100 mt-1 form-control' name='hours' id='hours' onChange={getUserData} />
                </Col>
                <Col xs={2} className="d-flex flex-column">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, key) => {
                        return (
                            <div key={key} className="form-check">
                                <input type="checkbox" name='days' className='form-check-input' id={day} value={key} onClick={(e) => addingToWeek(e.target.value)} />
                                <label htmlFor={day} className='form-check-label'>{day}</label>
                            </div>
                        )
                    })}
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup className='d-flex flex-column'>
                        <label htmlFor='classNote' className='text-center'>Additional Information</label>
                        <textarea className='form-control' name='classNote' id='classNote' cols="" rows="10" onChange={getUserData}></textarea>
                    </FormGroup>
                </Col>
                <Col className="d-flex flex-wrap flex-column">
                    <h3 className='text-primary mb-2'>Select RSS Instructor</h3>
                    {rssList.map((rss, key) => {
                        return (
                            <div key={key} className="form-check">
                                <input type="checkbox" name='instructor' className='form-check-input mx-2' id={rss._id} value={rss._id} onChange={getUserData} />
                                <label htmlFor={rss._id} className='form-check-label'>{rss.name}</label>
                            </div>
                        )
                    })}
                </Col>
                <Col className="d-flex flex-wrap flex-column">
                    <div  className={`${isHidden ? 'd-none' : 'b-flex'}`}>
                        <h3 className='text-primary mb-2'>Mandatory Class</h3>
                        {requiredClasses.includes(payload.classname) ? 'Class is MANDATORY' : (
                                <div className="form-check">
                                    <input type="checkbox" name='isRequired' className='form-check-input mx-2' id={payload.classname} value={payload.classname} onChange={getUserData} />
                                    <label htmlFor={payload.classname} className='form-check-label'>Make class {payload.classname} Mandatory</label>
                                </div>
                            )}
                        
                    </div>
                    <div  className={`${isHidden ? 'd-none' : 'b-flex'}`}>
                       
                        <h3 className='text-primary mb-2'>Trade Class</h3>
                        {tradeClasses.includes(payload.classname) ? 'Class is a TRADE' : (
                                <div className="form-check">
                                    <input type="checkbox" name='isTrade' className='form-check-input mx-2' id='isTrade' value={payload.classname} onChange={getUserData} />
                                    <label htmlFor='isTrade' className='form-check-label'>Make class {payload.classname} a Trade</label>
                                </div>
                            )}
                       
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='text-center my-4'>
                    <button className='btn btn-outline-primary btn-lg me-2' onClick={handleSubmit}>Create Class</button>

                    <button className='btn btn-outline-secondary btn-lg' onClick={handleSelectStudents}>Select Students</button>
                </Col>
            </Row>
            <Table className="table-hover table-responsive table-striped">
                <thead className="">
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
                            <span>Classes</span>
                        </th>
                        <th>
                            <span>Release Date</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {soonToRelease?.map((pupil, key) => {
                        return (
                            <tr key={key} className={`${isHidden ? 'd-none' : 'b-flex'}`}>
                                <td>{pupil.adc}</td>
                                <td>{pupil.name}</td>
                                <td>{pupil.bedSpace}</td>
                                <td><p>{(pupil.class)?.length > 0 ? pupil.class.map(c => c.classname + ', ') : ''}</p></td>
                                <td>{moment(pupil.releaseDate).format('L')}</td>
                                <td>
                                    <label htmlFor={pupil._id}>ADD</label>
                                    <input type="checkbox" name='students' className='form-check-input mx-2' id={pupil._id} value={pupil._id} onClick={(e) => addingToClass(e.target.value)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
};
