import React, { useState } from "react";
import "./Result.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import sampleResults from "../data/sampleResults.json";
import Map from "./Map";
import { Modal, Button, Container, Accordion } from "react-bootstrap";

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

function FlightInfo(result) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="nextButton btn-ckt" onClick={handleShow}>
        Details
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>This is a Title Yo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {/* <Row className="justify-content-center"> */}
              <Accordion flush >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Destination Flight</Accordion.Header>
                  <Accordion.Body>
                    <Map
                      departCode={result.departCodeDestination}
                      arriveCode={result.arriveCodeDestination}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Return Flight</Accordion.Header>
                  <Accordion.Body>
                    <Map
                      departCode={result.departCodeReturn}
                      arriveCode={result.arriveCodeReturn}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* Destination Flight
              <Map
                departCode={result.departCodeDestination}
                arriveCode={result.arriveCodeDestination}
              />
            </Row>
            <Row className="justify-content-center">
              Return Flight
              <Map
                departCode={result.departCodeReturn}
                arriveCode={result.arriveCodeReturn}
              /> */}
            {/* </Row> */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ckt" type="submit" onClick={handleClose}>
            Book
          </Button>

          <Button variant="" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Result(departCode, arriveCode, departDate, returnDate, passengers) {
  // const handleOnClick = (result) => {
  //     console.log(result);

  //
  //   };

  return sampleResults.map((result) => (
    <Row className="result-card mx-auto">
      <Col>
        <Card className="result">
          <Card.Body>
            <Card.Title className="text-center">
              {result.airlineDestination}{" "}
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {/* Can add Subtitle if you want */}
            </Card.Subtitle>
            <Row>
              <Col>
                <Card.Text>
                  <FontAwesomeIcon icon={faPlaneDeparture} />{" "}
                  {result.departCodeDestination}{" "}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {result.departDateDestination}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {result.departTimeDestination}
                </Card.Text>
              </Col>
              <Col>
                <Card.Text>
                  <FontAwesomeIcon icon={faPlaneArrival} />{" "}
                  {result.arriveCodeDestination}{" "}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {result.arriveDateDestination}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {result.arriveTimeDestination}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="result">
          <Card.Body>
            <Card.Title className="text-center">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
              {result.airlineReturn}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {/* Can add Subtitle if you want */}
            </Card.Subtitle>
            <Row>
              <Col>
                <Card.Text>
                  <FontAwesomeIcon icon={faPlaneDeparture} />{" "}
                  {result.departCodeReturn}{" "}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {result.departDateReturn}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faClock} /> {result.departTimeReturn}
                </Card.Text>
              </Col>
              <Col>
                <Card.Text>
                  <FontAwesomeIcon icon={faPlaneArrival} />{" "}
                  {result.arriveCodeReturn}{" "}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {result.arriveDateReturn}
                </Card.Text>

                <Card.Text>
                  <FontAwesomeIcon icon={faClock} /> {result.arriveTimeReturn}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}>
        <Card className="result">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faMoneyBill1} /> Price
            </Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faDollarSign} /> {result.price}
            </Card.Text>
            <FlightInfo
              departCodeDestination={result.departCodeDestination}
              arriveCodeDestination={result.arriveCodeDestination}
              departCodeReturn={result.departCodeReturn}
              arriveCodeReturn={result.arriveCodeReturn}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));
}

export default Result;
