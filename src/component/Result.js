import React from "react";
import "./Result.css";
import sampleResults from "../data/sampleResults.json";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faArrowRightFromBracket, faPlaneDeparture, faPlaneArrival, faCalendar, faClock, faMoneyBill1, faDollarSign } from "@fortawesome/free-solid-svg-icons";

function ResultCards({flightData, clickedCard, setClickedCard, showMap, setShowMap, stopCodes, setStopCodes}) {
  const handleShowDetails = (e) => {
    console.log("show details for card " + e.target.value);
    console.log(clickedCard);
    setClickedCard(e.target.value);
    clickedCard === e.target.value ? setClickedCard("") : setClickedCard(e.target.value); 
  };

  const handleShowHide = (result) => {
    const departCodes = [];
    const returnCodes = [];

    { result.direction[0].departureLegs.map((leg) => (
      departCodes.push(leg.departureCode),
      departCodes.push(leg.arrivalCode)))
    }
    
    {result.direction[1].returnLegs.map((leg) => (
      returnCodes.push(leg.departureCode),
      returnCodes.push(leg.arrivalCode)))
    }
    
    setStopCodes({"departCodes": departCodes, "returnCodes": returnCodes});

    setShowMap(true);
    setTimeout(() => {
      setShowMap(false);
    }, 3000);
    
  };

  // if (flightData.len === 0) {
  //   return null;
  // }

  // return flightData.map((result) => (

  // comment out the lines above and uncomment the line below to see the sample results

  return sampleResults.map((result) => (
    <>
    <Row className={clickedCard !== result.id ? "result-card mx-auto" : "result-card-clicked mx-auto"}>
      <Col className="result">
          <Card.Title className="result-title">Desitnation Route <FontAwesomeIcon icon={faArrowRightToBracket} /></Card.Title>
          <Row>
            <Col> 
              <Card.Text><FontAwesomeIcon icon={faPlaneDeparture} />{" "}{result.direction[0].departureLegs[0].departureCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[0].departureLegs[0].departureDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[0].departureLegs[0].departureTime}</Card.Text>
            </Col>
            <Col>
              <Card.Text><FontAwesomeIcon icon={faPlaneArrival} />{" "}{result.direction[0].departureLegs.at(-1).arrivalCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[0].departureLegs.at(-1).arrivalDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[0].departureLegs.at(-1).arrivalTime}</Card.Text>
            </Col>
          </Row>
      </Col>
      <Col className="result">
          <Card.Title className="result-title"><FontAwesomeIcon icon={faArrowRightFromBracket} /> Return Route</Card.Title>
          <Row>
            <Col> 
              <Card.Text><FontAwesomeIcon icon={faPlaneDeparture} />{" "}{result.direction[1].returnLegs[0].departureCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[1].returnLegs[0].departureDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[1].returnLegs[0].departureTime} </Card.Text>
            </Col>
            <Col>
              <Card.Text><FontAwesomeIcon icon={faPlaneArrival} />{" "}{result.direction[1].returnLegs.at(-1).arrivalCode}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faCalendar} />{" "}{result.direction[1].returnLegs.at(-1).arrivalDate}</Card.Text>
              <Card.Text><FontAwesomeIcon icon={faClock} />{" "}{result.direction[1].returnLegs.at(-1).arrivalTime}</Card.Text>
            </Col>
          </Row>
      </Col>
      <Col md={2} className="result">
          <Card.Title><FontAwesomeIcon icon={faMoneyBill1} /> Price</Card.Title>
          <Card.Text><FontAwesomeIcon icon={faDollarSign} /> {result.price}</Card.Text>
          <Button className="btn-ckt"  value={result.id} onClick={handleShowDetails}>{clickedCard !== result.id ? "Details" : "Hide"}</Button>
      </Col>
    </Row>
    {/* THIS THIS THE START OF THE DETAILS CARD */}
    {clickedCard === result.id ? (
    <Row className="result-details-card mx-auto">
      <Col className="result-details">
          <Card.Title className="result-title">Destination Route</Card.Title>
            <Row>
              <Col><FontAwesomeIcon icon={faCalendar} /></Col>
              <Col><FontAwesomeIcon icon={faPlaneDeparture} /></Col>
              <Col><FontAwesomeIcon icon={faPlaneArrival} /></Col>
              <Col><FontAwesomeIcon icon={faCalendar} /></Col>
            </Row>
            {result.direction[0].departureLegs.map((leg) => (
            <Row>
              <Col>{leg.departureDate}{" "}{leg.departureTime}</Col>
              <Col>{leg.departureCode}</Col>
              <Col>{leg.arrivalCode}</Col>
              <Col>{leg.arrivalDate}{" "}{leg.arrivalTime}</Col>
            </Row>
            ))}
          <Card.Title className="result-title">Return Route</Card.Title>
            <Row>
              <Col><FontAwesomeIcon icon={faCalendar} /></Col>
              <Col><FontAwesomeIcon icon={faPlaneDeparture} /></Col>
              <Col><FontAwesomeIcon icon={faPlaneArrival} /></Col>
              <Col><FontAwesomeIcon icon={faCalendar} /></Col>
            </Row>
            {result.direction[1].returnLegs.map((leg) => (
            <Row>
              <Col>{leg.departureDate}{" "}{leg.departureTime}</Col>
              <Col>{leg.departureCode}</Col>
              <Col>{leg.arrivalCode}</Col>
              <Col>{leg.arrivalDate}{" "}{leg.arrivalTime}</Col>
            </Row>
            ))}
          <Row className="map-button">
            <Button className="btn-ckt" onClick={() => handleShowHide(result)}>Show Map</Button>
          </Row>
      </Col>
    </Row>
    ) : null}
    </>
  ));
}

function Result({
  flightData, 
  clickedCard, 
  showMap,
  stopCodes, 
  setClickedCard, 
  setShowMap,
  setStopCodes
}) {
  return (
    <Container fluid className={showMap ? "result-container hide" : "result-container"}>
      <ResultCards 
        flightData={flightData} 
        showMap={showMap} 
        clickedCard={clickedCard}
        stopCodes={stopCodes} 
        setShowMap={setShowMap} 
        setClickedCard={setClickedCard} 
        setStopCodes={setStopCodes}
      />
    </Container>
  );
}

export default Result;
