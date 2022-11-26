import React from "react";
import Header from "../component/Header";
import Map from "../component/Map";

import "./HomePage.css";

function HomePage() {
  const [departCode, setDepartCode] = React.useState("MSP");
  const [arriveCode, setArriveCode] = React.useState("MSP");
  const [departDate, setDepartDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [passengers, setPassengers] = React.useState("1");
  const [flightData, setFlightData] = React.useState([]);
  const [clickedCard, setClickedCard] = React.useState("");
  const [showMap, setShowMap] = React.useState(false);
  const [stopCodes, setStopCodes] = React.useState({"departCodes": [], "returnCodes": []});

  return (
    <div className="homepage">
      <Header />
      <Map departCode={departCode}
        arriveCode={arriveCode}
        departDate={departDate}
        returnDate={returnDate}
        passengers={passengers}
        flightData={flightData}
        clickedCard={clickedCard}
        showMap={showMap}
        stopCodes={stopCodes}
        setDepartCode={setDepartCode}
        setArriveCode={setArriveCode}
        setDepartDate={setDepartDate}
        setReturnDate={setReturnDate}
        setPassengers={setPassengers}
        setFlightData={setFlightData}
        setClickedCard={setClickedCard}
        setShowMap={setShowMap}
        setStopCodes={setStopCodes}
        />
    </div>
  );
}

export default HomePage;
