import React from 'react';
import { Container, Table } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from 'react-icons/ai';
import { openModal } from '../../reducers/modalSlice';

export const RequiredClasses = () => {
    const dispatch = useDispatch();
    const requiredClasses = useSelector(state => state.getClasses.requiredClasses);

    const removeRequiredClass = (e) => {

        const message = (
            <section className="text-center">
                <h5>Remove as Required Class</h5>
                <h3>{e.currentTarget.dataset.id}</h3>
                <p className="my-4 text-larger">
                    has been removed
                </p>
            </section>
        );

        const payload = {
            message: message,
            id: e.currentTarget.dataset.id,
            type: 'removeRequiredClass'
        }

        dispatch(openModal(payload))
    };

    return (
        <Container>
            <h1 className='text-center my-4'>Required Classes</h1>
            <Table className="table-hover table-striped">
                <thead className=''>
                    <tr>
                        <th><span className="cursor-pointer">Class Name</span></th>
                        <th><span className="">Total: {requiredClasses.length}</span></th>
                    </tr>
                </thead>
            </Table>
            <Table className="table-hover table-striped">
                <tbody>
                    {
                        requiredClasses.map((required, key) => (
                            <tr key={key}>
                                <td>
                                    <p>{required}</p>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-lg rounded-pill"
                                        onClick={removeRequiredClass}
                                        data-id={required}
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

