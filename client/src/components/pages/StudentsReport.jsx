import React, { useRef } from "react";
import { Container, Table, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { PrintStudentReport } from "../PrintStudentReport";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

export const StudentsReport = () => {
  const activeStudents = useSelector(
    (state) => state.getStudents.closeToRelease
  );
  const requiredClasses = useSelector((state) => state.getClasses.requiredClasses)
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let classesTaken = [];
  let missedClasses = [];

  return (
    <Container fluid="true" className="mt-3">
      <Row>
        <Col className="d-flex justify-content-between">
          <h1>Students Report </h1>
          <span>Total: {activeStudents.length}</span>
          <button
            className="btn btn-outline-secondary btn-lg ms-3"
            onClick={handlePrint}
          >
            Print Report
          </button>
        </Col>
      </Row>
      <Table className="table-hover table-striped table-responsive">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>ADC</th>
            <th>Bed</th>
            <th>Release Date</th>
          </tr>
        </thead>
        {activeStudents.map((student, key) => {
          {
            missedClasses = [];
          }
          {
            classesTaken = [];
          }
          return (
            <tbody key={key}>
              <tr key={key}>
                <td className="w-50 text-primary">{student.name}</td>
                <td>{student.adc}</td>
                <td>{student.bedSpace}</td>
                <td>{moment(student.releaseDate).format("L")}</td>
              </tr>
              <td>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Completed Classes</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {student.class?.map((c, key) => {
                      {
                        classesTaken.push(c.classname);
                      }
                      return (
                        <tr key={key}>
                          <td>{c.classname}</td>
                          <td>{moment(c.startDate).format("L")}</td>
                          <td>{moment(c.endDate).format("L")}</td>
                        </tr>
                      );
                    })}
                    {requiredClasses.forEach((mandatory) => {
                      if (classesTaken.indexOf(mandatory) === -1) {
                        missedClasses.push(mandatory);
                      }
                    })}
                    {missedClasses.length > 0 && (
                      <th className="text-danger">Classes NOT Taken</th>
                    )}
                    <td>{missedClasses.map((c) => c + ", ")}</td>
                  </tbody>
                </Table>
              </td>
            </tbody>
          );
        })}
      </Table>
      <PrintStudentReport courseId={activeStudents} ref={componentRef} />
    </Container>
  );
};
