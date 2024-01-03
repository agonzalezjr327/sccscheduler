import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Table } from "reactstrap";
import { getEventInfo, getTradeInfo } from "../../reducers/getStudentsSlice";
import moment from "moment";

export const Classes = () => {
  const state = useSelector((state) => state.getStudents);
  const requiredClasses = useSelector(
    (state) => state.getClasses.requiredClasses
  );
  const tradeClasses = useSelector((state) => state.getClasses.tradeClasses);
  const isActive = useSelector((state) => state.getStudents.isActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let result = state.isActive.filter((s) => moment(s.releaseDate).isSameOrBefore(moment(new Date()).toDate()))
  
  const tradeClass = (e) => {
    let payload = {
      trade: e.target.value,
    };

    dispatch(getTradeInfo(payload));
    navigate("/waitlistclass");
  };

  const eventHandler = (e) => {
    let payload = {
      event: e.target.value,
      eventName: e.target.dataset.name,
    };

    dispatch(getEventInfo(payload));
    navigate("/event");
  };

  let badgeNumbers = [];
  let count = 0;
  tradeClasses.forEach((trade) => {
    isActive.forEach((student) => {
      if (trade.toLowerCase() === student.trade?.toLowerCase()) count++;
    });
    badgeNumbers.push(count);
    count = 0;
  });

  return (
    <Container fluid="true" className="pt-2 user-select-none">
      <Row className="flex-wrap">
        <Col xs="3">
          <Link
            className="btn btn-outline-dark btn-lg w-100 d-flex mt-2"
            to="/createstudent"
          >
            Add Student
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark btn-lg w-100 d-flex mt-2"
            to="/createclass"
          >
            Add Class
          </Link>
        </Col>

        <Col xs="3">
          <button
            className="btn btn-outline-dark btn-lg w-100 d-flex mt-2"
            value="graduation"
            data-name="Graduation"
            onClick={eventHandler}
          >
            Graduation <Badge></Badge>
          </button>
        </Col>
        <Col xs="3">
          <button
            className="btn btn-outline-dark btn-lg w-100 d-flex mt-2"
            value="orientation"
            data-name="Orientation"
            onClick={eventHandler}
          >
            Orientation <Badge></Badge>
          </button>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/arrivaldate"
          >
            Arrival Date
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/releasedate"
          >
            Release Date
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/rss"
          >
            RSS <Badge>{state.rssList.length}</Badge>
          </Link>
        </Col>
        <Col xs="3">
          <button
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            value="newFreedom"
            data-name="New Freedom"
            onClick={eventHandler}
          >
            New Freedom <Badge>{state.newFreedom.length}</Badge>
          </button>
        </Col>
        <Col xs="3">
          <button
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            value="smartJustice"
            data-name="Smart Justice"
            onClick={eventHandler}
          >
            Smart Justice <Badge>{state.smartJustice.length}</Badge>
          </button>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/monthlyreport"
          >
            Monthly Report
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/studentsreport"
          >
            Students Report
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/graduationreport"
          >
            Graduation Report
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/requiredclasses"
          >
            Required Classes <Badge>{requiredClasses.length}</Badge>
          </Link>
        </Col>
        <Col xs="3">
          <Link
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            to="/tradeclasses"
          >
            Trade Classes <Badge>{tradeClasses.length}</Badge>
          </Link>
        </Col>
        <Col xs="3">
          <button
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            value="childSupport"
            data-name="Parenting"
            onClick={eventHandler}
          >
            Child Support <Badge>{state.childSupport.length}</Badge>
          </button>
        </Col>
        <Col xs="3">
          <button
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            value="hasDriverLicense"
            data-name="Driver License"
            onClick={eventHandler}
          >
            Driver License <Badge>{state.hasDriverLicense.length}</Badge>
          </button>
        </Col>
        <Col xs="3">
          <button
            className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
            value="noDriverLicense"
            data-name="No Driver License"
            onClick={eventHandler}
          >
            No Driver License <Badge>{state.noDriverLicense.length}</Badge>
          </button>
        </Col>
        {tradeClasses.map((trade, key) => {
          return (
            <Col xs="3" key={key}>
              <button
                className="btn btn-outline-dark w-100 btn-lg d-flex justify-content-between align-items-end mt-2"
                value={trade}
                onClick={tradeClass}
              >
                {trade}
                <Badge>{badgeNumbers[key]}</Badge>
              </button>
            </Col>
          );
        })}
      </Row>
      <Row className={`${result.length < 1 && 'd-none'}`}>
        <h1 className='mt-3'>Students Releasing</h1>
        <Table className='table-hover table-striped user-select-none'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Bed Space</th>
              <th>Release Date</th>
            </tr>
          </thead>
          <tbody>
          {state.isActive.map((s, key) => {
            if (moment(s.releaseDate).isSameOrBefore(moment(new Date()).toDate())) {
              return <tr key={key} className="text-dark">
                <td>{s.name}</td>
                <td>{s.bedSpace}</td>
                <td>{s.releaseDate}</td>
              </tr>;
            }
          })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
