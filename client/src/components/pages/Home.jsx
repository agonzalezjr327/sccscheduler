import React from 'react';
import { Container } from 'reactstrap';
import { NavLink as Link } from "react-router-dom";
import { FaSignInAlt} from 'react-icons/fa';

export const Home = () => {
    return (
        <Container className='text-center text-primary'>
           
            <h1 className='text-center m-5'>SCC Scheduler</h1>
                <p>
                        <Link to="./logIn" className='btn btn-outline-primary btn-lg btn-block'>
                            <FaSignInAlt /> Log in
                        </Link>
                </p>
                <p className='d-flex justify-content-center align-items-end copyright'>
                    <small>&copy; Copyright Gonzalez-Sanchez Software 2024</small>
                </p>
        </Container>
    );
};
