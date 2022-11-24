import React, { useState } from "react";
import Header from "../component/Header";
// import TripForm from "../component/TripForm";
import Map from "../component/Map";
// import Result from "../component/Result";

import "./HomePage.css";

function HomePage() {
  const [departCode, setDepartCode] = useState("MSP");
  const [arriveCode, setArriveCode] = useState("ACY");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [flightData, setFlightData] = useState([]);

  return (
    <div className="homepage">
      <Header />
      <Map
        departCode={departCode}
        arriveCode={arriveCode}
        departDate={departDate}
        returnDate={returnDate}
        passengers={passengers}
        flightData={flightData}
        setDepartCode={setDepartCode}
        setArriveCode={setArriveCode}
        setDepartDate={setDepartDate}
        setReturnDate={setReturnDate}
        setPassengers={setPassengers}
        setFlightData={setFlightData}
      />
    </div>
  );
}

export default HomePage;
