import React from 'react';
import { Container, Table } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from 'react-icons/ai';
import { openModal } from '../reducers/modalSlice';

export const TradeClasses = () => {
    const dispatch = useDispatch();
    const tradeClasses = useSelector(state => state.getClasses.tradeClasses);

    const removeTradeClass = (e) => {

        const message = (
            <section className="text-center">
                <h5>Remove as Trade Class</h5>
                <h3>{e.currentTarget.dataset.id}</h3>
                <p className="my-4 text-larger">
                    has been removed
                </p>
            </section>
        );

        const payload = {
            message: message,
            id: e.currentTarget.dataset.id,
            type: 'removeTradeClass'
        }
        console.log(payload, 'in component')
        dispatch(openModal(payload))
    };

    return (
        <Container>
            <h1 className='text-center my-4'>Trade Classes</h1>
            <Table className="table-hover table-striped">
                <thead className=''>
                    <tr>
                        <th><span className="cursor-pointer">Class Name</span></th>
                        <th><span className="">Total: {tradeClasses.length}</span></th>
                    </tr>
                </thead>
            </Table>
            <Table className="table-hover table-striped">
                <tbody>
                    {
                        tradeClasses.map((required, key) => (
                            <tr key={key}>
                                <td>
                                    <p>{required}</p>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-lg rounded-pill"
                                        onClick={removeTradeClass}
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

