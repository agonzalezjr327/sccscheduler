import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Label, Form } from 'reactstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { login } from '../../reducers/userSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [payload, setPayload] = useState({});

    const getUserData = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    };

       const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.entries(payload) < 2) toast.error('Fill out Fields', { position: 'top-center', className: 'bg-danger text-light' });
        dispatch(login(payload));
        navigate('/dashboard');
    };

    return (
        <Container className='mt-5'>
            <h2 className='text-primary text-center mb-5'>Log in</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className='d-flex justify-content-between align-items-center w-100 flex-column'>

                        <Label for='email' className='mr-2 text-secondary m-2'>Email</Label>
                        <input className='form-control w-25' type="text" name="email" id="email" onChange={getUserData} required />

                        <Label for='password' className='text-secondary m-2'>Password</Label>
                        <input className='form-control w-25' type="password" autoComplete='none' name="password" id="password" suggested='' onChange={getUserData} required />

                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <button className='btn btn-outline-primary btn-lg mt-5'><FaSignInAlt /> Log in</button>
                    </Col>
                </Row>
            </Form>
        </Container>


    )
}