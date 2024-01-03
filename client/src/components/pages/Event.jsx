import React, { useState } from "react";
import { Container, Row, Col, Table, FormGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../reducers/modalSlice";
import {
  checkClassConflict,
  checkStudentConflict,
} from "../../utils/conflicts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getStudentProfile } from "../../reducers/getStudentsSlice";
import moment from "moment";

export const Event = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rssList = useSelector((state) => state.getStudents.rssList);
  const event = useSelector((state) => state.getStudents.eventStudents);
  const eventName = useSelector((state) => state.getStudents.eventName);
  const allStudents = useSelector((state) => state.getStudents.isActive);
  const allClasses = useSelector((state) => state.getClasses.classes);
  const [payload, setPayload] = useState({});
  let week = [];

  const addingToWeek = (day) => {
    if (week.includes(day)) {
      let newWeek = week.filter((remove) => remove !== day);
      week = newWeek;
    } else {
      week.push(day);
    }
    payload.days = week.sort();
    let sortedWeek = [];
    payload.days.map((d) => {
      let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      return sortedWeek.push(days[d]);
    });
    payload.days = sortedWeek;
  };

  const getUserData = (e) => {
    if (payload.instructor === undefined) payload.instructor = [];
    if (payload.classname === undefined) payload.classname = eventName;
    if (e.target.checked && e.target.name === "instructor")
      return payload.instructor.push(e.target.value);
    if (!e.target.checked && e.target.name === "instructor")
      return (payload.instructor = payload.instructor.filter(
        (i) => i !== e.target.value
      ));

    if (payload.students === undefined) payload.students = [];
    if (e.target.checked && e.target.name === "students")
      return payload.students.push(e.target.value);
    if (!e.target.checked && e.target.name === "students")
      return (payload.students = payload.students.filter(
        (i) => i !== e.target.value
      ));
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(payload).length < 1)
      toast.error("Fill out Fields", {
        position: "top-center",
        className: "bg-danger text-light",
      });
    if (payload.instructor.length < 1)
      toast.error("Select an Instructor", {
        position: "top-center",
        className: "bg-danger text-light",
      });

    let studentConflict = checkStudentConflict(
      payload.startDate,
      payload.startTime,
      payload.endDate,
      payload.endTime,
      payload.days,
      payload.students,
      allStudents
    );

    let classConflict = checkClassConflict(
      payload.startDate,
      payload.startTime,
      payload.endDate,
      payload.endTime,
      payload.classroom,
      allClasses,
      payload.days
    );

    const payloads = {
      type: "createclass",
      payload: payload,
      studentConflict: studentConflict,
      classConflict: classConflict,
    };

    dispatch(openModal(payloads));
  };

  const studentProfile = (person) => {
    dispatch(getStudentProfile(person));

    navigate(`/studentprofile`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-5 text-primary">{eventName}</h1>
        </Col>
      </Row>

      <datalist id="classroom">
        {[
          "Classroom 6",
          "Dorm 8",
          "Kitchen",
          "DES",
          "Visitation",
          "GYM",
          "HVAC",
          "Library",
          "Chow Hall",
          "Classroom 1",
          "Classroom 2",
          "Classroom 3",
          "Classroom 4",
          "Classroom 5",
          "Dorm 1",
          "Dorm 2",
          "Dorm 3",
          "Dorm 4",
          "Dorm 5",
          "Dorm 6",
          "Dorm 7",
          "Rec Yard",
        ].map((room) => {
          return <option value={room}>{room}</option>;
        })}
      </datalist>
      <Row>
        <Col className="d-flex flex-column">
          <label htmlFor="classroom">
            <b>Class Room</b>
          </label>
          <input
            type="text"
            name="classroom"
            id="classroom"
            list="classroom"
            className="form-control w-75 mt-1"
            onChange={getUserData}
          />
        </Col>
        <Col xs={2} className="d-flex flex-column">
          <label htmlFor="startDate">
            <b>Start Date</b>
          </label>
          <input
            className="w-100 mt-1 form-control"
            type="date"
            name="startDate"
            id="startDate"
            onChange={getUserData}
          />
          <label htmlFor="endDate" className="mt-4">
            <b>End Date</b>
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="w-100 mt-1 form-control"
            onChange={getUserData}
          />
        </Col>
        <Col xs={2} className="d-flex flex-column">
          <label htmlFor="startTime">
            <b>Start Time</b>
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            className="w-100 mt-1 form-control"
            onChange={getUserData}
          />
          <label htmlFor="endTime" className="mt-4">
            <b>End Time</b>
          </label>
          <input
            type="time"
            className="w-100 mt-1 form-control"
            name="endTime"
            id="endTime"
            onChange={getUserData}
          />
        </Col>
        <Col xs={2} className="d-flex flex-column">
          <label htmlFor="sessions">
            <b>Sessions</b>
          </label>
          <input
            type="number"
            className="w-100 mt-1 form-control"
            name="sessions"
            id="sessions"
            onChange={getUserData}
          />
          <label htmlFor="hours" className="mt-4">
            <b>Hours</b>
          </label>
          <input
            type="number"
            className="w-100 mt-1 form-control"
            name="hours"
            id="hours"
            onChange={getUserData}
          />
        </Col>
        <Col xs={2} className="d-flex flex-column">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day, key) => {
            return (
              <div key={key} className="form-check">
                <input
                  type="checkbox"
                  name="days"
                  className="form-check-input"
                  id={day}
                  value={key}
                  onClick={(e) => addingToWeek(e.target.value)}
                />
                <label htmlFor={day} className="form-check-label">
                  {day}
                </label>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup className="d-flex flex-column">
            <label htmlFor="classNote" className="text-center">
              Additional Information
            </label>
            <textarea
              className="form-control"
              name="classNote"
              id="classNote"
              cols=""
              rows="10"
              onChange={getUserData}
            ></textarea>
          </FormGroup>
        </Col>
        <Col className="d-flex flex-wrap flex-column">
          <h3 className="text-primary mb-2">Select RSS Instructor</h3>
          {rssList.map((rss, key) => {
            return (
              <div key={key} className="form-check">
                <input
                  type="checkbox"
                  name="instructor"
                  className="form-check-input mx-2"
                  id={rss._id}
                  value={rss._id}
                  onChange={getUserData}
                />
                <label htmlFor={rss._id} className="form-check-label">
                  {rss.name}
                </label>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col className="text-center my-4">
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={handleSubmit}
          >
            Create
          </button>
        </Col>
      </Row>
      <Table className="table-hover table-responsive table-striped">
        <thead className="">
          <tr>
            <th>
              <span>ADC</span>
            </th>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Bed</span>
            </th>
            <th>
              <span>Classes</span>
            </th>
            <th>
              <span>Release Date</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {event.map((pupil, key) => {
            return (
              <tr className="cursor-pointer" key={key}>
                <td onClick={(e) => studentProfile(pupil.adc)}>{pupil.adc}</td>
                <td onClick={(e) => studentProfile(pupil.adc)}>{pupil.name}</td>
                <td onClick={(e) => studentProfile(pupil.adc)}>
                  {pupil.bedSpace}
                </td>
                <td onClick={(e) => studentProfile(pupil.adc)}>
                  {pupil.class?.length > 0
                    ? pupil.class.map((c) => c.classname + ", ")
                    : ""}
                </td>
                <td onClick={(e) => studentProfile(pupil.adc)}>
                  {moment(pupil.releaseDate).format("L")}
                </td>
                <td>
                  <label htmlFor={pupil._id}>ADD</label>
                  <input
                    type="checkbox"
                    name="students"
                    className="form-check-input mx-2"
                    id={pupil._id}
                    value={pupil._id}
                    onChange={getUserData}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
