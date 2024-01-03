import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaBars, FaDesktop } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { getStudentProfile } from '../reducers/getStudentsSlice';
import { Col, Row, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
const routes = [
    {
        path: "/",
        name: "home",
        icon: <FaHome size={"1.5rem"} />,
    },
];

export const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inSCC = useSelector(state => state.getStudents);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
        setFilteredData([]);
        setWordEntered('');
    }

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = inSCC.allStudents.filter(value => {
            return value.adc?.includes(searchWord) || value.name?.toLowerCase().includes(searchWord.toLowerCase()) || value.bedSpace?.includes(searchWord)

        });

        if (searchWord === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter)
        }
    }


    const studentProfile = (person) => {

        dispatch(getStudentProfile(person));

        navigate(`/studentprofile`)
    }

    const inputAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            padding: 0,
        },
        show: {
            width: "100%",
            padding: "5px 15px",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <div className="main-container d-flex flex-column h-100 border-top border-light">
            <motion.div
                animate={{
                    width: isOpen ? "100%" : "3rem", transition: {
                        duration: 0.5,
                        type: 'spring',
                        damping: 10
                    }
                }}
                className="sidebar bg-dark h-100"
            >
                <div className="top-section d-flex align-items-center justify-content-between pt-2 px-2">
                    {isOpen && (
                        <motion.h5
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="logo text-light"
                        >
                            {/* <FaDesktop size='2rem' /> */}
                        </motion.h5>
                    )}
                    <div className="bars d-flex cursor-pointer text-light">
                        <FaBars size={"2rem"} onClick={toggle} />
                    </div>
                </div>
                <div className="search d-flex align-items-center mx-0 p-2">
                    <div className="search_icon p-1 text-light">
                        {isOpen && <BiSearch size={"1.5rem"} />}
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.input
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                variants={inputAnimation}
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search..."
                                className="form-control"
                                value={wordEntered}
                                onChange={handleFilter}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <Row>
                    {isOpen && filteredData.length !== 0 && (
                        <Col>
                            <Table className='table-responsive table-striped search-results bg-light'>
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
            </motion.div>
        </div>
    );
};
