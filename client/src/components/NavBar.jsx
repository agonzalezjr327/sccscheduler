import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { setLogout } from '../reducers/userSlice';
import { FaSignOutAlt, FaDatabase } from 'react-icons/fa';

export const NavBar = () => {
    const state = useSelector(state => state.user);
    const inSCC = useSelector(state => state.getStudents);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(
            setLogout()
        )
        navigate('/')
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-sm bg-dark sticky-top user-select-none">
            <button className="navbar-brand p-2 bg-dark border border-dark"><FaDatabase /> SCC Scheduler</button>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                <div className='navbar-nav mr-auto w-75 justify-content-center align-items-center'>
                    <ul className='d-flex w-100 justify-content-around'>
                        <li>
                            {state.isAuth && <NavLink className='text-light' to='/dashboard'>Home</NavLink>}
                        </li>
                        <li>
                            {state.isAuth && <NavLink className='text-light' to='/calendar'>Calendar</NavLink>}
                        </li>
                        <li>
                            {state.isAuth && <NavLink className='text-light' to='/classes'>Scheduling/Reports</NavLink>}
                        </li>
                        <li>
                            {state.isAuth && <NavLink className='text-light' to='/graphs'>Graphs</NavLink>}
                        </li>
                        <li>
                            {state.isAuth && <NavLink className='text-light' to='/classhistory'>Class History</NavLink>}
                        </li>
                        <li>
                            {state.isAuth && <p className='text-warning'>Students: <b>{inSCC.isActive.length}</b></p>}
                        </li>
                    </ul>
                </div>
                <div className='navbar-nav justify-content-end'>
                    <ul className='m-0'>
                        {state.isAuth && <button className='btn btn-outline-light btn-lg me-2' onClick={handleLogOut}><FaSignOutAlt /> Logout</button>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}