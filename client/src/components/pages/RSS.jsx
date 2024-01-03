import React from 'react';
import { Container, Table } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from 'react-icons/ai';
import { openModal } from '../../reducers/modalSlice';

export const RSS = () => {
    const dispatch = useDispatch();
    const rssList = useSelector(state => state.getStudents.rssList);
    const allClasses = useSelector(state => state.getClasses.completedClasses);
    let rssHours = []

    rssList.forEach(rss => {
        allClasses.forEach(classes => {
            classes.instructor.forEach(c => {
                if (c._id === rss._id) {
                    rssHours.push(classes.hours * classes.sessions)
                }
            })
        })
        rssHours.push(rss.name)
    })

    let bucket = []
    let num = 0
    rssHours.forEach(item => {
        if (!isNaN(item)) {
            num += item
        } else {
            bucket.push(num)
            num = 0
        }
    })
   

    const removeRSS = (e) => {

        const message = (
            <section className="text-center">
                <h5>Remove RSS</h5>
                <h3>{e.currentTarget.dataset.name}</h3>
                <p className="my-4 text-larger">
                    has been removed
                </p>
            </section>
        );

        const payload = {
            message: message,
            id: e.currentTarget.dataset.id,
            type: 'remove'
        }

        dispatch(openModal(payload))
    };

    return (
        <Container>
            <h1 className='text-center my-4'>RSS List</h1>
            <Table className="table-hover table-striped">
                <thead className=''>
                    <tr>
                        <th><span className="cursor-pointer">ADC</span></th>
                        <th><span className="cursor-pointer">Name</span></th>
                        <th><span className="cursor-pointer">Bed</span></th>
                        <th><span className="cursor-pointer">Hours</span></th>
                        <th><span className="">Total: {rssList.length}</span></th>
                    </tr>
                </thead>
            </Table>
            <Table className="table-hover table-striped">
                <tbody>
                    {
                        rssList.map((rss, key) => (
                            <tr key={key}>
                                <td>
                                    <p>{rss.adc}</p>
                                </td>
                                <td>
                                    <p>{rss.name}</p>
                                </td>
                                <td>
                                    <p className='pe-5'>{rss.bedSpace}</p>
                                </td>
                                <td><p className='pe-5'>{bucket[key].toFixed()}</p></td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-lg rounded-pill"
                                        onClick={removeRSS}
                                        data-id={rss._id}
                                        data-name={rss.name}
                                    >
                                        Remove
                                        <AiFillEdit className="ms-1" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

