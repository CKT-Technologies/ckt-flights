import React from "react";
import "./Result.css";
import sampleResults from "../data/sampleResults.json";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faArrowRightFromBracket, faPlaneDeparture, faPlaneArrival, faCalendar, faClock, faMoneyBill1, faDollarSign } from "@fortawesome/free-solid-svg-icons";

function ResultCards({flightData, clickedCard, setClickedCard}) {
  const handleShowDetails = (e) => {
    console.log("show details for card " + e.target.value);
    console.log(clickedCard);
    setClickedCard(e.target.value);

  };

  const handleHideDetails = (e) => {
    console.log("hide details");
    setClickedCard("");
  };
  

  flightData = flightData.flightData.flightData;
  console.log(flightData.length);
  if (flightData.len === 0) {
    return <div>ytdf</div>;
  }

  return flightData.map((result) => (

  // comment out the lines above and uncomment the line below to see the sample results

  // return sampleResults.map((result) => (
    <>
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
          <Button className="btn-ckt"  value={result.id} onClick={handleShowDetails}>Show Details</Button>
        </Card.Body>
      </Col>
    </Row>

    {clickedCard === result.id ? (
    <Row className="result-details-card mx-auto">
      <Col className="result-details">
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
      <Col className="result-details">
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
      <Col md={2} className="result-details">
        <Card.Body>
          <Card.Title><FontAwesomeIcon icon={faMoneyBill1} /> Price</Card.Title>
          <Card.Text><FontAwesomeIcon icon={faDollarSign} /> {result.price}</Card.Text>
          <Button className="btn-ckt"onClick={handleHideDetails} >Hide Details</Button>
        </Card.Body>
      </Col>
    </Row>
    ) : null}
    </>
  ));
}

function Result({flightData, clickedCard, setClickedCard}) {
  return (
    <Container fluid className="result-container">
      <ResultCards flightData={flightData} clickedCard={clickedCard} setClickedCard={setClickedCard} />
    </Container>
  );
}

export default Result;
