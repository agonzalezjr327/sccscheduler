import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Label, Form } from "reactstrap";
import { toast } from "react-toastify";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { create } from "../../reducers/createStudentSlice";

export const CreateStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tradeClasses = useSelector((state) => state.getClasses.tradeClasses);
  const [payload, setPayload] = useState({});

  const getUserData = (e) => {
    if (e.target.name === "trade") {
      setPayload({ ...payload, trade: e.target.value });
    } else if (e.target.name === "rss") {
      setPayload({ ...payload, rss: e.target.checked });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(payload) < 2)
      toast.error("Fill out Fields", {
        position: "top-center",
        className: "bg-danger text-light",
      });
    dispatch(create(payload));
    navigate("/dashboard");
  };

  return (
    <Container className="">
      <h1 className="text-center mt-5 text-primary">Add Student</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="d-flex justify-content-between align-items-center w-100 flex-column">
            <Label for="name" className="mr-2 text-dark m-2">
              Name
            </Label>
            <input
              className="form-control w-50"
              type="text"
              name="name"
              id="name"
              onChange={getUserData}
              required
            />

            <Label for="adc" className="text-dark m-2">
              ADC
            </Label>
            <input
              className="form-control w-50"
              type="text"
              name="adc"
              id="adc"
              onChange={getUserData}
              required
            />

            <Label for="bedSpace" className="text-dark m-2">
              Bed Space
            </Label>
            <input
              className="form-control w-50"
              type="text"
              name="bedSpace"
              id="bedSpace"
              onChange={getUserData}
              required
            />

            <Label for="releaseDate" className="text-dark m-2">
              Release Date
            </Label>
            <input
              className="form-control w-50"
              type="date"
              name="releaseDate"
              id="releaseDate"
              onChange={getUserData}
              required
            />

            <div className="form-check form-switch mt-3">
              <input
                className="form-check-input m-1"
                type="checkbox"
                name="rss"
                id="rss"
                onChange={getUserData}
              />
              <Label for="rss" className="text-dark form-check-label">
                RSS
              </Label>
            </div>
          </Col>
          <Col>
            <h3 className="text-dark text-left my-2">Trade Classes</h3>
            <Row className="">
              {
                tradeClasses.map((trade, key) => {
                  return (
                    <div className="custom-control custom-radio mb-1" key={key}>
                      <input
                        type="radio"
                        id={trade}
                        name="trade"
                        className="form-check-input me-2"
                        value={trade}
                        onChange={getUserData}
                        required
                      />
                      <label className="custom-control-label" htmlFor={trade}>
                        {trade}
                      </label>
                    </div>
                  );
                })
              }
              <div className="custom-control custom-radio mb-1">
                <input
                  type="radio"
                  id='None'
                  name="trade"
                  className="form-check-input me-2"
                  value='None'
                  onChange={getUserData}
                  required
                />
                <label className="custom-control-label" htmlFor='None'>
                  None
                </label>
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg mt-5"
            >
              <BsPerson /> Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
