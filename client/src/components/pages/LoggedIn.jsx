import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container } from 'reactstrap';
import { ClassesTable } from './ClassesTable';
import { getAllStudents } from '../../reducers/getStudentsSlice';
import { getAllClasses } from '../../reducers/getClassesSlice';

export const LoggedIn = () => {
  const allClasses = useSelector(state => state.getClasses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents())
    dispatch(getAllClasses())
  }, [dispatch])

  return (
    <Container fluid='true' className='p-0'>
      <Row className='m-0'>

        <Col className='justify-content-center'>
          <h1 className='my-3 user-select-none'>Classes in Session</h1>
          <ClassesTable data={allClasses.isActive} />
        </Col>

      </Row>
    </Container>
  );
}