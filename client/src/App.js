import React from 'react';
import { FiBell, FiCloudDrizzle } from 'react-icons/fi';
import { Row, Col } from 'reactstrap';
import { LoggedIn } from './components/pages/LoggedIn';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { NavBar } from './components/NavBar';
import { Classes } from './components/pages/Classes';
import { RSS } from './components/pages/RSS';
import { StudentProfile } from './components/pages/StudentProfile';
import { CreateStudent } from './components/pages/CreateStudent';
import { ConfirmModal } from './components/ConfirmModal';
import { CreateClass } from './components/pages/CreateClass';
import { SelectedClass } from './components/pages/SelectedClass';
import { CreateWaitlistClass } from './components/pages/CreateWaitlistClass';
import { SideBar } from './components/SideBar';
import { Event } from './components/pages/Event';
import { ClassHistory } from './components/pages/ClassHistory';
import { StudentsReport } from './components/pages/StudentsReport';
import { MonthlyReport } from './components/pages/MonthlyReport';
import { GraduationReport } from './components/pages/GraduationReport';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClassCalendar } from './components/pages/ClassCalendar';
import { ScrollToTop } from './components/ScrollToTop';
import { RequiredClasses } from './components/pages/RequiredClasses';
import { TradeClasses } from './components/TradeClasses';
import { Graphs } from './components/pages/Graphs';
import { ReleaseDate } from './components/pages/ReleaseDate';
import { ArrivalDate } from './components/pages/ArrivalDate';

function App() {
  const state = useSelector(state => state.user);
  const modal = useSelector(state => state.modal);
  if (state.isLoading) return <h1 className='text-center text-danger m-5'>Loading...</h1>;
  return (
    <Router>
      <NavBar />
      <ToastContainer icon={<FiCloudDrizzle />} closeOnClick={true} />
      <ConfirmModal show={modal.isOpen} />
      <ScrollToTop />
      <Row className='p-0 m-0 min-vh-100 user-select-none'>
        {state.isAuth &&
          <Col xs='2' className='p-0 min-vh-100'>
            <SideBar />
          </Col>
        }
        <Col>
          <Routes className=''>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={state.isAuth ? <LoggedIn /> : <Navigate to='/' replace />} />
            <Route path="/classes" element={state.isAuth ? <Classes /> : <Navigate to='/' replace />} />
            <Route path="/rss" element={state.isAuth ? <RSS /> : <Navigate to='/' replace />} />
            <Route path="/studentprofile" element={state.isAuth ? <StudentProfile /> : <Navigate to='/' replace />} />
            <Route path="/createstudent" element={state.isAuth ? <CreateStudent /> : <Navigate to='/' replace />} />
            <Route path="/createclass" element={state.isAuth ? <CreateClass /> : <Navigate to='/' replace />} />
            <Route path="/selectedclass" element={state.isAuth ? <SelectedClass /> : <Navigate to='/' replace />} />
            <Route path="/waitlistclass" element={state.isAuth ? <CreateWaitlistClass /> : <Navigate to='/' replace />} />
            <Route path="/event" element={state.isAuth ? <Event /> : <Navigate to='/' replace />} />
            <Route path="/classhistory" element={state.isAuth ? <ClassHistory /> : <Navigate to='/' replace />} />
            <Route path="/studentsreport" element={state.isAuth ? <StudentsReport /> : <Navigate to='/' replace />} />
            <Route path="/monthlyreport" element={state.isAuth ? <MonthlyReport /> : <Navigate to='/' replace />} />
            <Route path="/graduationreport" element={state.isAuth ? <GraduationReport /> : <Navigate to='/' replace />} />
            <Route path="/calendar" element={state.isAuth ? <ClassCalendar /> : <Navigate to='/' replace />} />
            <Route path="/requiredclasses" element={state.isAuth ? <RequiredClasses /> : <Navigate to='/' replace />} />
            <Route path="/tradeclasses" element={state.isAuth ? <TradeClasses /> : <Navigate to='/' replace />} />
            <Route path="/graphs" element={state.isAuth ? <Graphs /> : <Navigate to='/' replace />} />
            <Route path="/releasedate" element={state.isAuth ? <ReleaseDate /> : <Navigate to='/' replace />} />
            <Route path="/arrivaldate" element={state.isAuth ? <ArrivalDate /> : <Navigate to='/' replace />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
}

export default App;
