import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../reducers/modalSlice";
import { remove } from "../reducers/rssSlice";
import { removeRequiredClass } from "../reducers/removeRequiredClassSlice";
import { removeTradeClass } from "../reducers/removeTradeClassSlice";
import { creatingClass } from "../reducers/createClassSlice";
import { classUpdate } from "../reducers/updateClassSlice";
import { classToRemove } from "../reducers/deleteClassSlice";
import { studentToRemove } from "../reducers/removeStudentFromClassSlice";
import { graduateActiveClass } from "../reducers/graduateClassSlice";
import { useNavigate } from "react-router-dom";
import { removeFromRequiredClasses } from "../reducers/getClassesSlice";
import { removeFromTradeClasses } from "../reducers/getClassesSlice";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Table,
} from "reactstrap";
import { addToClass } from "../reducers/addStudentToClassSlice";
import { getAllStudents } from "../reducers/getStudentsSlice";
import { getAllClasses } from "../reducers/getClassesSlice";

export const ConfirmModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modal = useSelector((store) => store.modal);

  const confirm = () => {
    if (modal.type === "removeRequiredClass") {
      dispatch(removeRequiredClass({ payload: modal.id }));
      dispatch(removeFromRequiredClasses({ payload: modal.id }));
    }
    if (modal.type === "removeTradeClass") {
      dispatch(removeTradeClass({ payload: modal.id }));
      dispatch(removeFromTradeClasses({ payload: modal.id }));
    }
    if (modal.type === "remove") dispatch(remove({ id: modal.id }));
    if (modal.type === "updateclass") dispatch(classUpdate({ payload: modal.payload }));
    if (modal.type === "deleteclass") dispatch(classToRemove({ payload: modal }));
    if (modal.type === "removeStudent") dispatch(studentToRemove({ payload: modal.payload }));
    if (modal.type === "createclass") dispatch(creatingClass({ payload: modal.payload }));
    if (modal.type === "graduateclass") dispatch(graduateActiveClass({ payload: modal.payload }));
    if (modal.type === "addStudent") dispatch(addToClass({ payload: modal.payload }));

    dispatch(closeModal());
    navigate("/dashboard");
    dispatch(getAllStudents());
    dispatch(getAllClasses());
  };

  const cancelConfirm = () => {
    dispatch(closeModal());
    if (modal.type === "createclass") navigate("/createclass");
  };

  return (
    <Modal
      isOpen={props.show}
      centered={true}
      backdrop={true}
      className="text-center"
    >
      <ModalHeader className={`bg-light text-dark-50 d-flex justify-content-between align-items-end w-100`}>
        Confirmation Needed
        {modal.studentConflict?.length > 0 || modal.classConflict?.length > 0 ? <a style={{zIndex:2, scrollBehavior:'smooth'}} href="#bottom" className="btn btn-outline-primary position-fixed top-25">Scroll to Bottom</a> : null }
      </ModalHeader>
      <ModalBody>
        <div>{modal?.message}</div>
        {modal.payload?.classname !== undefined && (
          <h3>{modal.payload.classname.toUpperCase()}</h3>
        )}
        {modal.classConflict?.length > 0 ? (
          <div>
            <h4>Class Conflicts</h4>
            <Table className="table-hover table-striped">
              <thead className="">
                <tr>
                  <th>Class</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {modal.classConflict.map((conflict, key) => (
                  <tr className="" key={key}>
                    <td>{conflict.class}</td>
                    <td>{conflict.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : null}
        {modal.studentConflict?.length > 0 ? (
          <div>
            <h4>Student Conflicts</h4>
            <Table className="table-hover table-striped">
              <thead className="">
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {modal.studentConflict.map((conflict, key) => (
                  <tr className="" key={key}>
                    <td>{conflict.name}</td>
                    <td>{conflict.class}</td>
                    <td>{conflict.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : null}
      </ModalBody>
      <ModalFooter id="bottom">
        <Button color="primary" onClick={confirm}>
          Confirm
        </Button>
        <Button color="danger" onClick={cancelConfirm}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
