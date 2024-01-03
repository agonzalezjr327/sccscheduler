import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PieGraph } from "../PieGraph";
import { TradePieGraph } from "../TradePieGraph";
import { CityBarGraph } from "../CityBarGraph";
import { BarGraph } from "../BarGraph";
import { JobFieldBarGraph } from "../JobFieldBarGraph";
import { Container, Col, Row } from "reactstrap";

export const Graphs = () => {
  const state = useSelector((state) => state.getStudents);
  const tradeClasses = useSelector((state) => state.getClasses.tradeClasses);
  const requiredClasses = useSelector(
    (state) => state.getClasses.requiredClasses
  );
  const [showClasses, setShowClasses] = useState(true);
  const [showEthnicity, setShowEthnicity] = useState(false);
  const [showTrades, setShowTrades] = useState(false);
  const [showJobField, setShowJobField] = useState(false);
  const [showCity, setShowCity] = useState(false);

  //  Trade
  let badgeNumbers = [];
  let count = 0;
  tradeClasses.forEach((trade) => {
    state.isActive.forEach((student) => {
      student.class?.forEach((c) => {
        if (c.classname.toLowerCase() === trade.toLowerCase()) {
          count++;
        }
      });
    });
    badgeNumbers.push(count);
    count = 0;
  });

  const [tradeData, setTradeData] = useState({
    labels: tradeClasses.map((data) => data),
    datasets: [
      {
        label: "Total",
        data: badgeNumbers.map((data) => data),
        backgroundColor: [
          "red",
          "black",
          "brown",
          "orange",
          "blue",
          "purple",
          "green",
          "pink",
          "yellow",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  //  Classes Wait List
  let waitNumbers = [];
  let waitCount = 0;
  let waitClass = [];
  requiredClasses.forEach((trade) => {
    // array of classnames that are required
    state.isActive.forEach((student) => {
      // Is all the second chance inmates that are here
      student.class?.forEach((c) => {
        // loop thru the class array that the student has taken
        waitClass.push(c.classname);
      });
      if (!waitClass.includes(trade)) waitCount++;
      waitClass = [];
    });
    waitNumbers.push(waitCount);
    waitCount = 0;
  });

  const [userData, setUserData] = useState({
    labels: requiredClasses.map((data) => data),
    datasets: [
      {
        label: "Students waiting to be enrolled",
        data: waitNumbers.map((data) => data),
        backgroundColor: ["blue"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  //  Ethnicity
  let ethnicity = [
    "Mexican American",
    "Mexican National",
    "Caucasian",
    "Black",
    "Native Indian",
    "Asian",
    "Other",
  ];
  let raceNumbers = [];
  let raceCount = 0;
  ethnicity.forEach((trade) => {
    state.isActive.forEach((student) => {
      if (student.race === trade) raceCount++;
    });
    raceNumbers.push(raceCount);
    raceCount = 0;
  });

  const [pieData, setPieData] = useState({
    labels: ethnicity.map((data) => data),
    datasets: [
      {
        label: "Total",
        data: raceNumbers.map((data) => data),
        backgroundColor: [
          "brown",
          "green",
          "white",
          "black",
          "burlywood",
          "grey",
          "yellow",
          "orange",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // cities
  const phoenix = [];
  const mesa = [];
  const chandler = [];
  const glendale = [];
  const peoria = [];
  const buckeye = [];
  const showLow = [];
  const globe = [];
  const goodyear = [];
  const casaGrande = [];
  const apacheJunction = [];
  const nogales = [];
  const scottsdale = [];
  const safford = [];
  const tolleson = [];
  const yuma = [];
  const kingman = [];
  const winslow = [];
  const anthem = [];
  const sunCity = [];

  state.isActive.forEach((data) => {
    if (data.cityReleasingTo === "Show Low") showLow.push(data);
    if (data.cityReleasingTo === "Phoenix") phoenix.push(data);
    if (data.cityReleasingTo === "Mesa") mesa.push(data);
    if (data.cityReleasingTo === "Chandler") chandler.push(data);
    if (data.cityReleasingTo === "Glendale") glendale.push(data);
    if (data.cityReleasingTo === "Peoria") peoria.push(data);
    if (data.cityReleasingTo === "Scottsdale") scottsdale.push(data);
    if (data.cityReleasingTo === "Buckeye") buckeye.push(data);
    if (data.cityReleasingTo === "Globe") globe.push(data);
    if (data.cityReleasingTo === "Goodyear") goodyear.push(data);
    if (data.cityReleasingTo === "Apache Junction") apacheJunction.push(data);
    if (data.cityReleasingTo === "Casa Grande") casaGrande.push(data);
    if (data.cityReleasingTo === "Nogales") nogales.push(data);
    if (data.cityReleasingTo === "Yuma") yuma.push(data);
    if (data.cityReleasingTo === "Tolleson") tolleson.push(data);
    if (data.cityReleasingTo === "Kingman") kingman.push(data);
    if (data.cityReleasingTo === "Safford") safford.push(data);
    if (data.cityReleasingTo === "Winslow") winslow.push(data);
    if (data.cityReleasingTo === "Anthem") anthem.push(data);
    if (data.cityReleasingTo === "Sun City") sunCity.push(data);
  });

  let cityList = [
    { city: "Phoenix", releasingTo: phoenix.length },
    { city: "Mesa", releasingTo: mesa.length },
    { city: "Glendale", releasingTo: glendale.length },
    { city: "Chandler", releasingTo: chandler.length },
    { city: "Goodyear", releasingTo: goodyear.length },
    { city: "Peoria", releasingTo: peoria.length },
    { city: "Scottsdale", releasingTo: scottsdale.length },
    { city: "Buckeye", releasingTo: buckeye.length },
    { city: "Globe", releasingTo: globe.length },
    { city: "Apache Junction", releasingTo: apacheJunction.length },
    { city: "Casa Grande", releasingTo: casaGrande.length },
    { city: "Show Low", releasingTo: showLow.length },
    { city: "Nogales", releasingTo: nogales.length },
    { city: "Yuma", releasingTo: yuma.length },
    { city: "Tolleson", releasingTo: tolleson.length },
    { city: "Kingman", releasingTo: kingman.length },
    { city: "Safford", releasingTo: safford.length },
    { city: "Winslow", releasingTo: winslow.length },
    { city: "Anthem", releasingTo: anthem.length },
    { city: "Sun City", releasingTo: sunCity.length },
  ];

  const [cityData, setCityData] = useState({
    labels: cityList.map((data) => {
      if (data.releasingTo > 0) return data.city;
    }),
    datasets: [
      {
        label: "Total",
        data: cityList.map((data) => {
          if (data.releasingTo > 0) return data.releasingTo;
        }),
        backgroundColor: [
          "black",
          "cadetblue",
          "brown",
          "orange",
          "blue",
          "green",
          "red",
          "yellow",
          "chartreuse",
          "gray",
          "burlywood",
          "orangered",
          "yellowgreen",
          "aliceblue",
          "aquamarine",
          "purple",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // Job Field
  const construction = [];
  const mechanic = [];
  const customerService = [];
  const sales = [];
  const maintenance = [];
  const foodService = [];
  const warehouse = [];
  const landscape = [];
  const plumbing = [];
  const transportation = [];
  const computers = [];
  const electrician = [];
  const manufacturing = [];
  const peerSupport = [];
  const other = [];

  state.isActive.forEach((data) => {
    if (data.jobField === "Customer Service") customerService.push(data);
    if (data.jobField === "Construction") construction.push(data);
    if (data.jobField === "Mechanic") mechanic.push(data);
    if (data.jobField === "Sales") sales.push(data);
    if (data.jobField === "Maintenance") maintenance.push(data);
    if (data.jobField === "Food Service") foodService.push(data);
    if (data.jobField === "Warehouse") warehouse.push(data);
    if (data.jobField === "Landscape") landscape.push(data);
    if (data.jobField === "Plumbing") plumbing.push(data);
    if (data.jobField === "Transportation") transportation.push(data);
    if (data.jobField === "IT/Computers") computers.push(data);
    if (data.jobField === "Electrician") electrician.push(data);
    if (data.jobField === "Manufacturing") manufacturing.push(data);
    if (data.jobField === "Peer Support") peerSupport.push(data);
    if (data.jobField === "Other") other.push(data);
  });

  let jobFieldList = [
    { job: "Construction", jobField: construction.length },
    { job: "Mechanic", jobField: mechanic.length },
    { job: "Maintenance", jobField: maintenance.length },
    { job: "Sales", jobField: sales.length },
    { job: "Customer Service", jobField: customerService.length },
    { job: "Food Service", jobField: foodService.length },
    { job: "Warehouse", jobField: warehouse.length },
    { job: "Landscape", jobField: landscape.length },
    { job: "Transportation", jobField: transportation.length },
    { job: "IT/Computers", jobField: computers.length },
    { job: "Electrician", jobField: electrician.length },
    { job: "Plumbing", jobField: plumbing.length },
    { job: "Manufacturing", jobField: manufacturing.length },
    { job: "Peer Support", jobField: peerSupport.length },
    { job: "Other", jobField: other.length },
  ];

  const [jobFieldData, setJobFieldData] = useState({
    labels: jobFieldList.map((data) => {
      if (data.jobField > 0) return data.job;
    }),
    datasets: [
      {
        label: "Total",
        data: jobFieldList.map((data) => {
          if (data.jobField > 0) return data.jobField;
        }),
        backgroundColor: [
          "black",
          "red",
          "purple",
          "blue",
          "pink",
          "orange",
          "grey",
          "gold",
          "green",
          "yellow",
          "chartreuse",
          "gray",
          "burlywood",
          "yellowgreen",
          "aliceblue",
          "aquamarine",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const toggleGraph = (e) => {
    setShowClasses(e.target.value === 'Classes' ? true : false);
    setShowEthnicity(e.target.value === 'Ethnicity' ? true : false);
    setShowTrades(e.target.value === 'Trades' ? true : false);
    setShowJobField(e.target.value === 'Job Field' ? true : false);
    setShowCity(e.target.value === 'City' ? true : false);
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          {["Classes", "Ethnicity", "Trades", "Job Field", "City"].map(
            (button, key) => (
              <button
                className="btn btn-outline-primary btn-lg me-2 mt-1"
                key={key}
                value={button}
                onClick={toggleGraph}
              >
                {button}
              </button>
            )
          )}
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center">
        {showClasses && (
          <Col xs="11">
            <h1>Classes</h1>
            <BarGraph classList={userData} />
          </Col>
        )}
        {showEthnicity && (
          <Col xs="5">
            <h1>Ethnicity</h1>
            <PieGraph raceList={pieData} />
          </Col>
        )}
        {showTrades && (
          <Col xs="5">
            <h1>Trades</h1>
            <TradePieGraph tradeList={tradeData} />
          </Col>
        )}
        {showJobField && (
          <Col xs="11">
            <h1>Job Field</h1>
            <JobFieldBarGraph jobFieldList={jobFieldData} />
          </Col>
        )}
        {showCity && (
          <Col xs="11">
            <h1>City</h1>
            <CityBarGraph cityList={cityData} />
          </Col>
        )}
      </Row>
    </Container>
  );
};
