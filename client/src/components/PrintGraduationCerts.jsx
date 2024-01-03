import React from "react";
import { useSelector } from "react-redux";

export const PrintGraduationCerts = React.forwardRef((props, ref) => {
  const classSelected = useSelector((state) => state.getClasses.classInfo);
  let studentsInClass = classSelected.map((m) => m.students);

  studentsInClass = studentsInClass.flat();

  return (
    <div ref={ref} className="d-none d-print-block container">

      {classSelected[0].students.map((c, key) => {
        return (
          <div className="d-flex align-items-center justify-content-center graduation-cert">
            <h1>{c.name}</h1>
          </div>
        );
       })} 
    </div>
  );
});
