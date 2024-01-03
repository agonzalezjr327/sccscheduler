import React from "react";
import { Table, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";

export const PrintStudentReport = React.forwardRef((props, ref) => {
  const activeStudents = useSelector(
    (state) => state.getStudents.closeToRelease
  );
  const mandatoryClasses = useSelector((state) => state.getClasses.requiredClasses);

  let classesTaken = [];
  let missedClasses = [];

  return (
    <div ref={ref} className="d-none d-print-flex flex-column container m-3">
      <Row>
        <Col className="d-flex justify-content-around">
          <h1>Students Report </h1>
          <span>Total: {activeStudents.length}</span>
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
                    {mandatoryClasses.forEach((mandatory) => {
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
    </div>
  );
});
