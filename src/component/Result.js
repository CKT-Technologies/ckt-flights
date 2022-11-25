import React from "react";
import "./Result.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fakeResults from "../data/fakeResults.json";
import sampleResults from "../data/sampleResults.json";
import Map from "./Map";
import {
  Button,
  Container,
  Accordion
} from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faPlaneDeparture,
  faPlaneArrival,
  faCalendar,
  faClock,
  faMoneyBill1,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function Results(flightData) {
  flightData = flightData.flightData.flightData;
  console.log(flightData.length);
  if (flightData.len === 0) {
    return <div>ytdf</div>;
  }


  return flightData.map((result) => (
  // return sampleResults.map((result, index) => (
    <Row className="result-card mx-auto">
      <Col className="result">
        <Card.Body>
          <Card.Title className="result-title">Desitnation Route <FontAwesomeIcon icon={faArrowRightToBracket} /></Card.Title>
          <Row>
            <Col> 
              <Card.Text><FontAwesomeIcon icon={faPlaneDeparture} />{" "}{result.direction[0].departureLegs[0].departureCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[0].departureLegs[0].departureDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[0].departureLegs[0].departureTime}</Card.Text>
            </Col>
            <Col>
              <Card.Text><FontAwesomeIcon icon={faPlaneArrival} />{" "}{result.direction[0].departureLegs[sampleResults.length-1].arrivalCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[0].departureLegs[sampleResults.length-1].arrivalDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[0].departureLegs[sampleResults.length-1].arrivalTime}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Col>
      <Col className="result">
        <Card.Body>
          <Card.Title className="result-title"><FontAwesomeIcon icon={faArrowRightFromBracket} /> Return Route</Card.Title>
          <Row>
            <Col> 
              <Card.Text><FontAwesomeIcon icon={faPlaneDeparture} />{" "}{result.direction[1].returnLegs[0].departureCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[1].returnLegs[0].departureDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[1].returnLegs[0].departureTime} </Card.Text>
            </Col>
            <Col>
              <Card.Text><FontAwesomeIcon icon={faPlaneArrival} />{" "}{result.direction[1].returnLegs[sampleResults.length-1].arrivalCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[1].returnLegs[sampleResults.length-1].arrivalDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[1].returnLegs[sampleResults.length-1].arrivalTime}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Col>
      <Col md={2} className="result">
        <Card.Body>
          <Card.Title><FontAwesomeIcon icon={faMoneyBill1} /> Price</Card.Title>
          <Card.Text><FontAwesomeIcon icon={faDollarSign} /> {result.price}</Card.Text>
          <Button className="btn-ckt">Details</Button>
        </Card.Body>
      </Col>
    </Row>
  ));
}

function Result(flightData) {
  return (
    <Container fluid className="result-container">
      <Results flightData={flightData}/>
    </Container>
  );
}

export default Result;
