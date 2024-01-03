import React, { Fragment, useState } from 'react';
import { useDispatch } from "react-redux";
import { Col, Row, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaEraser } from 'react-icons/fa';
import { getStudentProfile } from '../reducers/getStudentsSlice';

export const SearchBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState('');

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = props.data.filter(value => {
            return value.adc.includes(searchWord) || value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.bedSpace.includes(searchWord)

        });

        if (searchWord === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter)
        }
    }

    const clearInput = (e) => {
        setFilteredData([]);
        setWordEntered('');
    }

    const studentProfile = (person) => {
       
        dispatch(getStudentProfile(person));

        navigate(`/studentprofile`)
    }

    return (
        <Fragment>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <input type="text" name="search" id="search" value={wordEntered} placeholder='Search Student' className='form-control sticky-top' onChange={handleFilter} />
                    <span className="m-1">
                        {filteredData.length === 0 ? <FiSearch size='1.5rem' /> : <FaEraser id='clearBtn' size='1.5rem' onClick={clearInput} />}

                    </span>
                </Col>
            </Row>
            <Row>
                {filteredData.length !== 0 && (
                    <Col>
                        <Table className='table-responsive table-striped search-results'>
                            <tbody>
                                {filteredData.slice(0, 10).map((value, key) =>
                                    <tr key={key} className='text-center cursor-pointer'>
                                        <td onClick={(e) => studentProfile(value.adc)}>
                                            {value.adc} {value.bedSpace} {value.name}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                )}
            </Row>
        </Fragment>
    );
};
