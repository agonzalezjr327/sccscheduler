import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Col, Row } from "reactstrap";
import { FiSearch } from "react-icons/fi";
import { FaEraser } from "react-icons/fa";
import { getAllStudents } from '../reducers/getStudentsSlice';
import { getAllClasses } from '../reducers/getClassesSlice';
import { toast } from "react-toastify";
import { openModal } from '../reducers/modalSlice';
import { checkClassConflict, checkStudentConflict } from "../utils/conflicts";

export const StudentSearch = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [addStudent, setAddStudent] = useState("");
    const [studentToAddId, setStudentToAddId] = useState("");
    const [adcNumber, setAdcNumber] = useState("");
    const selectedClass = useSelector((state) => state.getClasses.classInfo);
    const allStudents = useSelector(state => state.getStudents.isActive);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = props.studentData.filter((value) => {
            return (
                value.adc?.includes(searchWord) ||
                value.name?.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.bedSpace?.includes(searchWord)
            );
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = (e) => {
        setFilteredData([]);
        setWordEntered("");
    };

    const findStudent = (studentId, name, adc) => {
        setAddStudent(name);
        clearInput();
        setStudentToAddId(studentId);
        setAdcNumber(adc)
    };

    const studentToAdd = () => {
        let isInClass = selectedClass[0].students.filter(s => s._id === studentToAddId);
        if (isInClass.length > 0) {
            toast.error(`${addStudent} is already in class`, { position: 'top-center', className: 'bg-danger text-light' });
        } else {
            let payload = {
                studentToAddId: studentToAddId,
                courseId: selectedClass[0]._id
            }

            let studentConflict = checkStudentConflict(props.startDate, props.startTime, props.endDate, props.endTime, props.days, props.students, allStudents);

            const message = (
                <section className="text-center">
                    <h5>Add {addStudent}</h5>
                    <p className="my-4 text-larger">
                        Confirm to Update
                    </p>
                </section>
            );

            const payloads = {
                message: message,
                type: 'addStudent',
                payload: payload,
                studentConflict: studentConflict,
            }
    
            dispatch(openModal(payloads));

            setAddStudent('');
            clearInput();
            setStudentToAddId('');
            setAdcNumber('');
            dispatch(getAllStudents())
            dispatch(getAllClasses())
            navigate('/dashboard')
           
        }
    }

    const cancel = () => {
        setAddStudent('');
        clearInput();
        setStudentToAddId('');
        setAdcNumber('')
    }

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getAllClasses())
    }, [dispatch])

    return (
        <Fragment>
            <Row>
                <Col className="d-flex">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={wordEntered}
                        placeholder="Search"
                        className="p-2 form-control w-25"
                        onChange={handleFilter}
                    />
                    <span className="cursor-pointer ms-2">
                        {filteredData.length === 0 ? (
                            <FiSearch size="1.5rem" />
                        ) : (
                            <FaEraser id="clearBtn" size="1.5rem" onClick={clearInput} />
                        )}
                    </span>
                    {addStudent === "" ? (
                        ""
                    ) : (
                        <p className="ms-5">
                            <span className="me-2">{addStudent} {adcNumber}</span>
                            <button className="btn btn-outline-secondary rounded-pill" onClick={studentToAdd}>
                                Add Student
                            </button>
                            <button className="btn btn-outline-danger rounded-pill ms-2" onClick={cancel}>
                                Cancel
                            </button>
                        </p>
                    )}
                </Col>
            </Row>
            <Row>
                {filteredData.length !== 0 && (
                    <Col>
                        {filteredData.slice(0, 15).map((value, key) => (
                            <p
                                className="cursor-pointer"
                                key={key}
                                onClick={(e) => findStudent(value._id, value.name, value.adc)}
                            >
                                {value.adc} {value.bedSpace} {value.name}
                            </p>
                        ))}
                    </Col>
                )}
            </Row>
        </Fragment>
    );
};
