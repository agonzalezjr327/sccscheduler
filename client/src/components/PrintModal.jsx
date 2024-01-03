import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";

export const PrintModal = React.forwardRef((props, ref) => {

  const classSelected = useSelector((state) => state.getClasses.classInfo);
  let studentsInClass = classSelected.map((m) => m.students);

  studentsInClass = studentsInClass.flat();

  function formatDate(dateObject) {
    const parts = {
      date: dateObject.getDate(),
      month: dateObject.getMonth() + 1,
      year: dateObject.getFullYear(),
    };
    return `${parts.month}/${parts.date}/${parts.year}`;
  }

  function formatTime(dateObject) {

    let r = dateObject.split(':')
    const parts = {
      hour: Number(r[0]) < 13 ? r[0] : Number(r[0]) - 12,
      minute: r[1],
      amOrPm: Number(r[0]) < 12 ? 'AM' : 'PM',
    };
    return `${parts.hour}:${parts.minute} ${parts.amOrPm}`;
  }

  return (
    <div ref={ref} className='d-none d-print-flex flex-column container mx-3'>
      <h1 className='text-center my-5'>{classSelected[0].classname.toUpperCase()}</h1>
   <span className="">Total: {studentsInClass.length}</span>
            
      <Table className="table-hover table-striped">

        {classSelected.map((c, key) => {
          return (
            <thead key={key} className="">
              <tr>
                <th>
                  <span className="cursor-pointer">Start Date: {formatDate(new Date(c.startDate))} TO: {formatDate(new Date(c.endDate))}</span>
                </th>
                <th>
                  <span className="cursor-pointer">Start Time: {formatTime(c.startTime)} TO: {formatTime(c.endTime)}</span>
                </th>
              </tr>
              <tr>
              </tr>
              <tr>
                <th>
                  <span className="cursor-pointer">Room: {c.classroom}</span>
                </th>
                <th>
                  <span className="cursor-pointer">Sessions: {c.sessions}</span>
                </th>
                <th>
                  <span className="cursor-pointer">Days: {c.days.map((d) => d + " ")}</span>
                </th>

              </tr>
            </thead>
          )
        })}
        <thead>
          <tr>
            <th>
              <span className="cursor-pointer">ADC</span>
            </th>
            <th>
              <span className="cursor-pointer">Name</span>
            </th>
            <th>
              <span className="cursor-pointer">Bed</span>
            </th>
            {/* <th>
              <span className="cursor-pointer">Release Date</span>
            </th> */}
            
          </tr>
        </thead>

        <tbody className="">
          {studentsInClass.map((pupil, key) => (
            <tr className="" key={key}>
              <td>{pupil.adc}</td>
              <td>{pupil.name}</td>
              <td>{pupil.bedSpace}</td>
              {/* <td>{pupil.releaseDate}</td> */}
              {/* <td>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      
      {classSelected[0].classNote !== undefined && <h3 className="text-center mt-2">Additional Information</h3>}
      <p className="m-3">{classSelected[0].classNote}</p>
    </div>
  );
});