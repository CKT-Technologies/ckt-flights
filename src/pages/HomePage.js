import React from "react";
import Header from "../component/Header";
import Map from "../component/Map";

import "./HomePage.css";

function HomePage() {
  const [departCode, setDepartCode] = React.useState("MSP");
  const [arriveCode, setArriveCode] = React.useState("ACY");
  const [departDate, setDepartDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [passengers, setPassengers] = React.useState("1");
  const [flightData, setFlightData] = React.useState([]);
  const [clickedCard, setClickedCard] = React.useState("");

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
        setDepartCode={setDepartCode}
        setArriveCode={setArriveCode}
        setDepartDate={setDepartDate}
        setReturnDate={setReturnDate}
        setPassengers={setPassengers}
        setFlightData={setFlightData}
        setClickedCard={setClickedCard}/>
    </div>
  );
}

export default HomePage;
