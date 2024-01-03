import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Form, FormGroup, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { update } from "../../reducers/updateStudentSlice";
import { getClassInfo } from "../../reducers/getClassesSlice";
import moment from "moment";

export const StudentProfile = () => {
  const student = useSelector((state) => state.getStudents.studentProfile);
  const requiredClasses = useSelector((state) => state.getClasses.requiredClasses);
  const tradeClasses = useSelector(state => state.getClasses.tradeClasses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});

  let classesTaken = [];
  let missedClasses = [];

  const getUserData = (e) => {
    if (e.target.name === "isRemoved") {
      if (e.target.checked === true) {
        return setPayload({ ...payload, isRemoved: true });
      } else {
        return setPayload({ ...payload, isRemoved: false });
      }
    }
    if (e.target.name === "courtfines")
      return setPayload({ ...payload, courtfines: e.target.checked });
    if (e.target.name === "veteran")
      return setPayload({ ...payload, veteran: e.target.checked });
    if (e.target.name === "wioa")
      return setPayload({ ...payload, wioa: e.target.checked });
    if (e.target.name === "isGraduated")
      return setPayload({ ...payload, isGraduated: e.target.checked });
    if (e.target.name === "hasActiveLicense")
      return setPayload({ ...payload, hasActiveLicense: e.target.checked });
    if (e.target.name === "hasChildSupport")
      return setPayload({ ...payload, hasChildSupport: e.target.checked });
    if (e.target.name === "enrollForensicPeerSupport")
      return setPayload({ ...payload, enrollForensicPeerSupport: e.target.checked });

    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payload.adc !== undefined && payload.adc[0] == 0)
      return toast.error("ADC cannot start with 0", {
        position: "top-center",
        className: "bg-danger text-light",
      });
    if (Object.entries(payload).length < 1) {
      return toast.error("Fill out Fields", {
        position: "top-center",
        className: "bg-danger text-light",
      });
    } else {
      payload.adc === undefined && (payload.adc = student[0].adc);
      payload.id === undefined && (payload.id = student[0]._id);
      payload.name === undefined && (payload.name = student[0].name);
      payload.bedSpace === undefined &&
        (payload.bedSpace = student[0].bedSpace);
      payload.releaseDate === undefined &&
        (payload.releaseDate = student[0].releaseDate);
      payload.arrivalDate === undefined &&
        (payload.arrivalDate = student[0].arrivalDate);
      payload.cityReleasingTo === undefined &&
        (payload.cityReleasingTo = student[0].cityReleasingTo);
      payload.jobField === undefined &&
        (payload.jobField = student[0].jobField);
      payload.desTeam === undefined && (payload.desTeam = student[0].desTeam);
      payload.ssn === undefined && (payload.ssn = student[0].ssn);
      payload.placeReleasingTo === undefined &&
        (payload.placeReleasingTo = student[0].placeReleasingTo);
      payload.note === undefined && (payload.note = student[0].note);
      payload.isActive === undefined &&
        (payload.isActive = student[0].isActive);
      payload.wioa === undefined && (payload.wioa = student[0].wioa);
      payload.isRemoved === undefined && (payload.isRemoved = student[0].isRemoved);
      payload.courtfines === undefined && (payload.courtfines = student[0].courtfines);
      payload.veteran === undefined && (payload.veteran = student[0].veteran);
      payload.hasActiveLicense === undefined && (payload.hasActiveLicense = student[0].hasActiveLicense);
      payload.hasChildSupport === undefined && (payload.hasChildSupport = student[0].hasChildSupport);
      payload.enrollForensicPeerSupport === undefined && (payload.enrollForensicPeerSupport = student[0].enrollForensicPeerSupport);
      payload.dob === undefined && (payload.dob = student[0].dob);
      payload.isGraduated === undefined &&
        (payload.isGraduated = student[0].isGraduated);
      dispatch(update(payload));
      navigate("/dashboard");
    }
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

  const selectedClass = (id) => {
    let payload = {
      courseId: id,
    };
    dispatch(getClassInfo(payload));

    navigate(`/selectedclass`);
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          {student.map((student,key) => {
      student.class?.map((c, key) => classesTaken.push(c.classname))
            return (
              <div key={key}>
                <h1 className="d-flex justify-content-center">
                  {student.name}
                </h1>
                {moment(student.releaseDate).isBefore(
                  moment(new Date()).toDate()
                ) && <h2 className="text-danger text-center">Released</h2>}
              </div>
            );
          })}

          <h2 className="d-flex justify-content-center text-danger">
            {student[0].isRemoved && "REMOVED from SCC"}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {student.map((student, key) => {
            return (
              <Form onSubmit={handleSubmit} key={key}>
                <datalist id="cityReleasingTo">
                  {[
                    "Phoenix",
                    "Mesa",
                    "Tempe",
                    "Glendale",
                    "Chandler",
                    "Gilbert",
                    "Peoria",
                    "Scottsdale",
                    "Buckeye",
                    "Litchfield",
                    "Fountain Hills",
                    "Goodyear",
                    "Tucson",
                    "Casa Grande",
                    "Maryvale",
                    "San Tan Valley",
                    "Apache Junction",
                    "Payson",
                    "Prescott",
                    "Flagstaff",
                    "Yuma",
                    "Sedona",
                    "Show Low",
                    "Safford",
                    "Globe",
                    "Winslow",
                    "Williams",
                    "Kingman",
                    "Nogales",
                    "Douglas",
                    "Bullhead",
                    "Tolleson",
                    "Maricopa",
                    "Safford",
                    "Anthem",
                    "Sun City",
                    "Out of state",
                  ].map((city, key) => {
                    return (
                      <option value={city} key={key}>
                        {city}
                      </option>
                    );
                  })}
                </datalist>
                <datalist id="jobField">
                  {[
                    "Construction",
                    "Manufacturing",
                    "Maintenance",
                    "Landscape",
                    "Customer Service",
                    "Peer Support",
                    "Warehouse",
                    "Food Service",
                    "Mechanic",
                    "Transportation",
                    "Plumbing",
                    "Electrician",
                    // "Welder",
                    "Sales",
                    "IT/Computers",
                    // "HVAC",
                    // "Self-Employed",
                    "Other",
                  ].map((job, key) => {
                    return (
                      <option value={job} key={key}>
                        {job}
                      </option>
                    );
                  })}
                </datalist>
                <datalist id="placeReleasingTo">
                  {[
                    "Family",
                    "Friends",
                    "Homeless",
                    "New Freedom",
                    "New Leaf",
                    "Halfway House",
                    "Dont Know",
                  ].map((city, key) => {
                    return (
                      <option value={city} key={key}>
                        {city}
                      </option>
                    );
                  })}
                </datalist>
                <Row>
                  <Col xs="6" className="d-flex flex-column align-items-center">
                    <Row
                      key={2}
                      className="d-flex justify-content-center w-100"
                    >
                      <Col>
                        <FormGroup>
                          <label htmlFor={student.name} className="text-center">
                            Name
                          </label>
                          <input
                            className="form-control w-100"
                            type="text"
                            name="name"
                            id={student.name}
                            onChange={getUserData}
                            placeholder={student.name}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label htmlFor={student.adc} className="text-center">
                            ADC
                          </label>
                          <input
                            className="form-control w-100"
                            type="text"
                            name="adc"
                            id={student.adc}
                            onChange={getUserData}
                            placeholder={student.adc}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label
                            htmlFor={student.bedSpace}
                            className="text-center"
                          >
                            Bed Space
                          </label>
                          <input
                            className="form-control w-100"
                            type="text"
                            name="bedSpace"
                            id={student.bedSpace}
                            onChange={getUserData}
                            placeholder={student.bedSpace}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label
                            htmlFor={student.releaseDate}
                            className="text-center"
                          >
                            Release Date
                          </label>
                          <input
                            className="form-control w-100"
                            type="text"
                            name="releaseDate"
                            id={student.releaseDate}
                            onChange={getUserData}
                            placeholder={moment(student.releaseDate).format(
                              "L"
                            )}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            htmlFor="cityReleasingTo"
                            className="text-center"
                          >
                            City Releasing To:
                          </label>
                          <input
                            className="form-control w-100"
                            type="text"
                            name="cityReleasingTo"
                            id="cityReleasingTo"
                            onChange={getUserData}
                            placeholder={student.cityReleasingTo}
                            list="cityReleasingTo"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            htmlFor="releaseDate"
                            className="text-center"
                          >
                            Arrival Date: Second Chance Center
                          </label>
                          <input
                            className="form-control w-100"
                            type="text"
                            name="arrivalDate"
                            id="arrivalDate"
                            onChange={getUserData}
                            placeholder={moment(student.arrivalDate).format(
                              "L"
                            )}
                          />
                        </FormGroup>
                        <FormGroup className="d-flex">
                          <div className="form-check">
                            {student.courtfines === undefined ||
                            student.courtfines === false ? (
                              <input
                                type="checkbox"
                                name="courtfines"
                                className="form-check-input"
                                id="courtfines"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>Enlisted</b>
                            )}
                            <label
                              htmlFor="courtfines"
                              className="text-info form-check-label text-dark me-2"
                            >
                              Court Fines
                            </label>
                          </div>
                          <div className="form-check">
                            {student.veteran === undefined ||
                            student.veteran === false ? (
                              <input
                                type="checkbox"
                                name="veteran"
                                className="form-check-input"
                                id="veteran"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>Enlisted</b>
                            )}
                            <label
                              htmlFor="veteran"
                              className="text-info form-check-label text-dark me-2"
                            >
                              Veteran
                            </label>
                          </div>
                          <div className="form-check">
                            {student.wioa === undefined ||
                            student.wioa === false ? (
                              <input
                                type="checkbox"
                                name="wioa"
                                className="form-check-input"
                                id="wioa"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>Enlisted</b>
                            )}
                            <label
                              htmlFor="wioa"
                              className="text-info form-check-label text-dark me-2"
                            >
                              WIOA
                            </label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label htmlFor="desTeam" className="text-center">
                            DES Team
                          </label>
                          <input
                            className="form-control w-100"
                            type="number"
                            name="desTeam"
                            id="desTeam"
                            onChange={getUserData}
                            placeholder={student.desTeam}
                          />
                        </FormGroup>
                        {/* Housing - Were are they going */}
                        <FormGroup>
                          <label
                            htmlFor="placeReleasingTo"
                            className="text-center"
                          >
                            Place Releasing To:
                          </label>
                          <input
                            className="form-control w-100"
                            list="placeReleasingTo"
                            type="text"
                            name="placeReleasingTo"
                            id="placeReleasingTo"
                            onChange={getUserData}
                            placeholder={student.placeReleasingTo}
                          />
                        </FormGroup>
                        {/* Input for Job Field */}
                        <FormGroup>
                          <label
                            htmlFor="jobField"
                            className="text-center"
                          >
                            Job Field:
                          </label>
                          <input
                            className="form-control w-100"
                            list="jobField"
                            type="text"
                            name="jobField"
                            id="jobField"
                            onChange={getUserData}
                            placeholder={student.jobField}
                            />
                        </FormGroup>
                        {/* Text Area for Notes */}
                        <FormGroup>
                          <label htmlFor="note" className="text-center">
                            Additional Information
                          </label>
                          <textarea
                            className="form-control"
                            name="note"
                            id="note"
                            cols="37"
                            defaultValue={student.note}
                            rows="2"
                            onChange={getUserData}
                          ></textarea>
                        </FormGroup>
                        {/* Remove from SCC Checkbox */}
                        <div className="form-check">
                        {student.isRemoved === undefined ||
                            student.isRemoved === false ? (
                              <input
                                type="checkbox"
                                name="isRemoved"
                                className="form-check-input"
                                id="isRemoved"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>True, </b>
                            )}
                          <label
                            htmlFor="isRemoved"
                            className="text-info form-check-label text-dark me-2"
                          >
                            Remove from Second Chance
                          </label>
                        </div>
                        {/* Graduated checkbox */}
                        <div className="form-check">
                          <input
                            type="checkbox"
                            name="isGraduated"
                            className="form-check-input"
                            id="isGraduated"
                            onClick={getUserData}
                          />
                          <label
                            htmlFor="isGraduated"
                            className="text-info form-check-label text-dark me-2"
                          >
                            Graduate from Second Chance
                          </label>
                        </div>
                        {/* Driver License Checkbox */}
                        <div className="form-check">
                        {student.hasActiveLicense === undefined ||
                            student.hasActiveLicense === false ? (
                              <input
                                type="checkbox"
                                name="hasActiveLicense"
                                className="form-check-input"
                                id="hasActiveLicense"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>Has </b>
                            )}
                            <label
                              htmlFor="hasActiveLicense"
                              className="text-info form-check-label text-dark me-2"
                            >
                              Active Driver License
                            </label>
                        </div>
                        {/* Child Support */}
                        <div className="form-check">
                        {student.hasChildSupport === undefined ||
                            student.hasChildSupport === false ? (
                              <input
                                type="checkbox"
                                name="hasChildSupport"
                                className="form-check-input"
                                id="hasChildSupport"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>Has </b>
                            )}
                            <label
                              htmlFor="hasChildSupport"
                              className="text-info form-check-label text-dark me-2"
                            >
                              Child Support
                            </label>
                        </div>
                        {/* Enroll in Forensic Peer Support */}
                        <div className="form-check">
                        {student.enrollForensicPeerSupport === undefined ||
                            student.enrollForensicPeerSupport === false ? (
                              <input
                                type="checkbox"
                                name="enrollForensicPeerSupport"
                                className="form-check-input"
                                id="enrollForensicPeerSupport"
                                onClick={getUserData}
                              />
                            ) : (
                              <b>Has </b>
                            )}
                            <label
                              htmlFor="enrollForensicPeerSupport"
                              className="text-info form-check-label text-dark me-2"
                            >
                              Forensic Peer Support
                            </label>
                        </div>
                      </Col>
                    </Row>
                    {/* Update Button */}
                    <Row className="w-100">
                      <Col className="d-flex justify-content-end">
                        <input
                          className="btn btn-outline-primary btn-lg"
                          type="submit"
                          value="Update"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="2">
                    <h3 className="text-left mt-2">Trade Classes</h3>
                    {student.trade !== undefined && (
                      <FormGroup>
                        <label className="text-center text-dark">
                          Waiting for: <b>{`${student.trade}`}</b>
                        </label>
                      </FormGroup>
                    )}
                    {tradeClasses.map((trade, key) => {
                      return (
                        <FormGroup
                          className="custom-control custom-radio mb-1"
                          key={key}
                        >
                          <input
                            type="radio"
                            id={trade}
                            name="trade"
                            className="form-check-input me-2"
                            value={trade}
                            onChange={getUserData}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={trade}
                          >
                            {trade}
                          </label>
                        </FormGroup>
                      );
                    })}
                     <FormGroup
                          className="custom-control custom-radio mb-1"
                        >
                          <input
                            type="radio"
                            id='None'
                            name="trade"
                            className="form-check-input me-2"
                            value='None'
                            onChange={getUserData}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor='None'
                          >
                            None
                          </label>
                        </FormGroup>
                    <FormGroup>
                      <label className={`text-center ${!student.isActive ? 'text-danger' : ''}`}>
                        Active: {`${student.isActive}`}
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <label>
                        RSS:{" "}
                        {`${
                          student.isRSS === undefined ? "No" : student.isRSS
                        }`}
                      </label>
                    </FormGroup>

                    <FormGroup>
                      <label>
                        Graduated:{" "}
                        {`${
                          student.isGraduated === undefined
                            ? "No"
                            : student.isGraduated
                        }`}
                      </label>
                    </FormGroup>
                  </Col>

                  <Col xs="4">
                    <h3 className="text-center mt-2">Classes</h3>
                    {requiredClasses.forEach((mandatory) => {
                      if (classesTaken.indexOf(mandatory) === -1) {
                        missedClasses.push(mandatory);
                      }
                    })}
                    {missedClasses.length > 0 && (
                      <span className="text-danger">Classes NOT Taken</span>
                      )}
                    <p>{missedClasses.map((c) => c + ", ")}</p>
                    <Table className="table-hover">
                      <thead className="">
                        <tr>
                          <th>Class</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          student?.class?.map((classInfo, key) => (
                            <tr
                              className="cursor-pointer"
                              onClick={(e) => selectedClass(classInfo._id)}
                              key={key}
                            >
                              <td>
                                <button className="btn ">
                                  {classInfo.classname}
                                </button>
                              </td>
                              <td>
                                {moment(classInfo.startDate).format("L")}
                                <br />
                                {moment(classInfo.endDate).format("L")}
                              </td>
                              <td>
                                {formatTime(classInfo.startTime)}
                                <br />
                                {formatTime(classInfo.endTime)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Form>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
