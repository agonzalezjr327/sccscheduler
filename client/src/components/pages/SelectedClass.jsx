import React, { useState, useRef } from "react";
import { Container, Table, Row, Col, FormGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { openModal } from "../../reducers/modalSlice";
import { useReactToPrint } from "react-to-print";
import { PrintModal } from "../PrintModal";
import { PrintMediaConsent } from "../PrintMediaConsent";
import { PrintGraduationCerts } from "../PrintGraduationCerts";
import { StudentSearch } from "../StudentSearch";
import { getStudentProfile } from '../../reducers/getStudentsSlice';
import moment from "moment";

export const SelectedClass = () => {
  const componentRef = useRef();
  const componentRef2 = useRef();
  const componentRef3 = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const classSelected = useSelector((state) => state.getClasses.classInfo);
  const activeStudents = useSelector((state) => state.getStudents.isActive);
  let week = [];

  const getUserData = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintMedia = useReactToPrint({
    content: () => componentRef2.current,
  });
  const handlePrintCerts = useReactToPrint({
    content: () => componentRef3.current,
    pageStyle: () => "8in 11in",
  });

  const updateClass = () => {
    if (payload === undefined) {
      toast.error("Fill out Field", { position: "top-center" });
    } else {
      payload.id = classSelected[0]._id;
      payload.classname = classSelected[0].classname;
      payload.classroom === undefined &&
        (payload.classroom = classSelected[0].classroom);
      payload.startDate === undefined &&
        (payload.startDate = classSelected[0].startDate);
      payload.endDate === undefined &&
        (payload.endDate = classSelected[0].endDate);
      payload.startTime === undefined &&
        (payload.startTime = classSelected[0].startTime);
      payload.endTime === undefined &&
        (payload.endTime = classSelected[0].endTime);
      payload.sessions === undefined &&
        (payload.sessions = classSelected[0].sessions);
      payload.hours === undefined && (payload.hours = classSelected[0].hours);
      payload.days === undefined && (payload.days = classSelected[0].days);
      payload.classNote === undefined &&
        (payload.classNote = classSelected[0].classNote);

      const message = (
        <section className="text-center">
          <h5>Update {classSelected[0].classname.toUpperCase()}</h5>
          <p className="my-4 text-larger">Confirm to Update</p>
        </section>
      );

      const payloads = {
        message: message,
        id: classSelected[0]._id,
        type: "updateclass",
        payload: payload,
      };

      dispatch(openModal(payloads));
    }
  };

  const deleteClass = () => {
    const message = (
      <section className="text-center">
        <h5>Delete {classSelected[0].classname.toUpperCase()}</h5>
        <p className="my-4 text-larger">Confirm to Delete</p>
      </section>
    );

    const payloads = {
      message: message,
      id: classSelected[0]._id,
      type: "deleteclass",
    };

    dispatch(openModal(payloads));
  };

  const removeFromClass = (e) => {
    const message = (
      <section className="text-center">
        <h5>Remove {e.currentTarget.dataset.name}</h5>
        <p className="my-4 text-larger">Confirm to Remove from Class</p>
      </section>
    );

    let payloads = {
      payload: {
        courseId: classSelected[0]._id,
        studentId: e.currentTarget.dataset.id,
      },
      message: message,
      type: "removeStudent",
    };

    dispatch(openModal(payloads));
  };

  const graduateClass = (e) => {
    const message = (
      <section className="text-center">
        <h5>{classSelected[0].classname}</h5>
        <p className="my-4 text-larger">Confirm to Graduate Class</p>
      </section>
    );

    let payloads = {
      payload: {
        id: classSelected[0]._id,
      },
      message: message,
      type: "graduateclass",
    };

    dispatch(openModal(payloads));
  };

  function formatTime(dateObject) {
    // remove colon in time 01:00
    let r = dateObject.split(":");
    // if time is less than 10 than it will appear like 09:00am
    // so I remove the 0 with if statement
    if (r[0] < 10) {
      let d = r[0].split("0");
      d.shift();
      r[0] = d;
    }

    const parts = {
      // if over 12, minus by 12 so it wont appear in military time
      hour: Number(r[0]) < 13 ? r[0] : Number(r[0]) - 12,
      minute: r[1],
      amOrPm: Number(r[0]) < 12 ? "AM" : "PM",
    };

    return `${parts.hour}:${parts.minute} ${parts.amOrPm}`;
  }

  const studentProfile = (person) => {
       
    dispatch(getStudentProfile(person));

    navigate(`/studentprofile`)
}

  return (
    <Container>
      <Row>
        <Col xs="3">
          {classSelected.map((c, key) => {
            return (
              <h1 key={key} className="text-center mt-2">
                {c.classname.toUpperCase()}
              </h1>
            );
          })}
        </Col>
        <Col className="my-3" xs="9">
          <button
            type="button"
            className="btn btn-outline-dark btn-lg mx-3"
            data-toggle="modal"
            data-target=".bd-example-modal-xl"
            onClick={handlePrint}
          >
            Print
          </button>
          {classSelected[0].classname === "Graduation" && (
            <button
              type="button"
              className="btn btn-outline-dark btn-lg me-3"
              data-toggle="modal"
              data-target=".bd-example-modal-xl"
              onClick={handlePrintMedia}
            >
              Print Media
            </button>
          )}
          {classSelected[0].classname === "Graduation" && (
            <button
              type="button"
              className="btn btn-outline-dark btn-lg me-3"
              data-toggle="modal"
              data-target=".bd-example-modal-xl"
              onClick={handlePrintCerts}
            >
              Print Certificates
            </button>
          )}
          <button
            className="btn btn-outline-dark btn-lg me-3"
            onClick={updateClass}
            data-action="POST"
            data-list="updateClass"
            data-key="payload"
          >
            Update
          </button>
          <button
            className="btn btn-outline-dark btn-lg me-3"
            onClick={graduateClass}
            data-action="POST"
            data-list="graduateClass"
            data-key="payload"
          >
            Graduate Class
          </button>
          <button
            className="btn btn-outline-danger btn-lg rounded-pill"
            onClick={deleteClass}
            data-action="POST"
            data-list="createdClass"
            data-key="payload"
          >
            Delete Class
          </button>
        </Col>
      </Row>
      {classSelected.map((info, key) => {
        return (
          <Row key={key} className="flex-wrap">
            <Col xs={3} className="d-flex flex-column">
              <label htmlFor="classroom">
                <b>Class Room</b>
              </label>
              <input
                type="text"
                className="w-75 form-control"
                name="classroom"
                id="classroom"
                defaultValue={info.classroom}
                onChange={getUserData}
              />
            </Col>
            <Col xs={2} className="d-flex flex-column">
              <label htmlFor="startDate">
                <b>Start Date</b>
              </label>
              <input
                className="w-75 form-control"
                type="text"
                name="startDate"
                id="startDate"
                defaultValue={moment(info.startDate).format("L")}
                onChange={getUserData}
              />
              <label htmlFor="endDate">
                <b>End Date</b>
              </label>
              <input
                type="text"
                name="endDate"
                id="endDate"
                className="w-75 form-control"
                defaultValue={moment(info.endDate).format("L")}
                onChange={getUserData}
              />
            </Col>
            <Col xs={2} className="d-flex flex-column">
              <label htmlFor="startTime">
                <b>Start Time</b>
              </label>
              <input
                type="text"
                name="startTime"
                id="startTime"
                className="w-75 form-control"
                defaultValue={formatTime(info.startTime)}
                onChange={getUserData}
              />
              <label htmlFor="endTime">
                <b>End Time</b>
              </label>
              <input
                type="text"
                className="w-75 form-control"
                name="endTime"
                id="endTime"
                defaultValue={formatTime(info.endTime)}
                onChange={getUserData}
              />
            </Col>
            <Col xs={2} className="d-flex flex-column">
              <label htmlFor="sessions">
                <b>Sessions</b>
              </label>
              <input
                type="number"
                className="w-75 form-control"
                name="sessions"
                id="sessions"
                defaultValue={info.sessions}
                onChange={getUserData}
              />
              <label htmlFor="hours">
                <b>Hours</b>
              </label>
              <input
                type="number"
                className="w-75 form-control"
                name="hours"
                id="hours"
                defaultValue={info.hours}
                onChange={getUserData}
              />
            </Col>
            <Col xs={3} className="d-flex flex-column">
              <label htmlFor="instructor">
                <b>Days:</b>
              </label>
              <p> {info.days.map((d) => d + ", ")}</p>
            </Col>
            <Col xs={6}>
              <FormGroup className="d-flex flex-column mt-2">
                <label htmlFor="classNote" className="text-center">
                  Additional Information
                </label>
                <textarea
                  className="form-control"
                  name="classNote"
                  id="classNote"
                  cols=""
                  rows="5"
                  defaultValue={info.classNote}
                  onChange={getUserData}
                ></textarea>
              </FormGroup>
            </Col>
            <Col xs={3} className="d-flex flex-column mt-2">
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
                    <label
                      htmlFor={day}
                      className="text-info form-check-label text-dark"
                    >
                      {day}
                    </label>
                  </div>
                );
              })}
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col>
          <StudentSearch
            studentData={activeStudents}
            startDate={classSelected[0].startDate}
            startTime={classSelected[0].startTime}
            endDate={classSelected[0].endDate}
            endTime={classSelected[0].endTime}
            days={classSelected[0].days}
            students={classSelected[0].students}
            classroom={classSelected[0].classroom}
          />
        </Col>
      </Row>
      <Table className="table-hover table-striped">
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
              <span>Release Date</span>
            </th>
            <th>
              <span>Total: {classSelected[0].students.length}</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {classSelected[0].students.map((pupil, key) => (
            <tr className="cursor-pointer" key={key}>
              <td onClick={(e) => studentProfile(pupil.adc)}>{pupil.adc}</td>
              <td onClick={(e) => studentProfile(pupil.adc)}>{pupil.name}</td>
              <td onClick={(e) => studentProfile(pupil.adc)}>{pupil.bedSpace}</td>
              <td onClick={(e) => studentProfile(pupil.adc)}>{pupil.releaseDate}</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-lg rounded-pill"
                  onClick={removeFromClass}
                  data-action="POST"
                  data-list="createdClass"
                  data-key="payload"
                  data-id={pupil._id}
                  data-name={pupil.name}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PrintModal courseId={classSelected[0]._id} ref={componentRef} />
      <PrintMediaConsent courseId={classSelected[0]._id} ref={componentRef2} />
      <PrintGraduationCerts
        courseId={classSelected[0]._id}
        ref={componentRef3}
      />
    </Container>
  );
};
