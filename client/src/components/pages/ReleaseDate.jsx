import React, { useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Label, Form, Table } from "reactstrap";
import { FaSignInAlt } from "react-icons/fa";
import { PrintReleases } from "../PrintReleases";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import moment from "moment";

export const ReleaseDate = () => {
  const componentRef = useRef();
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [releases, setReleases] = useState([]);
  let students = useSelector((state) => state.getStudents.allStudents);
  students = [...students].sort((a, b) => {
    let x = moment(a.releaseDate).valueOf();
    let y = moment(b.releaseDate).valueOf();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  const getUserData = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const clearReport = (e) => {
    setReleases([]);
    setShow(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(payload) < 1)
      return toast.error("Fill out Field", {
        position: "top-center",
        className: "bg-danger text-light",
      });
    if (moment(payload.from).isAfter(moment(payload.to)))
      return toast.error("To release date is after from release date", {
        position: "top-center",
        className: "bg-danger text-light",
      });

    setReleases(
      students.filter(
        (r) =>
          moment(r.releaseDate).isSameOrAfter(
            moment(payload.from).format("L")
          ) &&
          moment(r.releaseDate).isSameOrBefore(moment(payload.to).format("L"))
      )
    );

    setShow(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-primary text-center mt-5">Release Dates</h2>
          <button className="btn btn-outline-dark btn-lg" onClick={handlePrint}>
            {" "}
            Print
          </button>
          <button
            className="btn btn-outline-danger btn-lg ms-3"
            onClick={clearReport}
          >
            {" "}
            Clear
          </button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="d-flex justify-content-between align-items-center w-100 flex-column">
            <Label for="from" className="mr-2 text-secondary m-2">
              From:
            </Label>
            <input
              className="form-control w-25"
              type="date"
              name="from"
              id="from"
              onChange={getUserData}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between align-items-center w-100 flex-column">
            <Label for="to" className="mr-2 text-secondary m-2">
              To:
            </Label>
            <input
              className="form-control w-25"
              type="date"
              name="to"
              id="to"
              onChange={getUserData}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <button className="btn btn-outline-primary btn-lg">
              <FaSignInAlt />
              Select Release Dates
            </button>
          </Col>
        </Row>
      </Form>

      {show && (
        <div>
          <h1 className="my-5">Release Totals: {releases.length}</h1>
          <Table className="table-hover table-striped table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>ADC</th>
                <th>Bed Space</th>
                <th>Release Date</th>
              </tr>
            </thead>
            <tbody>
              {releases.map((s, key) => {
                return (
                  <tr key={key}>
                    <td>{s.name}</td>
                    <td>{s.adc}</td>
                    <td>{s.bedSpace}</td>
                    <td>{s.releaseDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      <PrintReleases releases={releases} ref={componentRef} />
    </Container>
  );
};
