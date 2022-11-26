import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles.json";
import { blue, red, green, orange } from "@mui/material/colors";
import items from "../data/airports.json";
import TripForm from "../component/TripForm";
import Result from "../component/Result";

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

function getCoords(airportCode) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].code === airportCode) {
      return { lat: parseInt(items[i].lat), lng: parseInt(items[i].lng) };
    }
  }
}

const options = {
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  scrollwheel: false,
  draggable: false,
  styles: mapStyles,
};

function Map({
  departCode,
  arriveCode,
  departDate,
  returnDate,
  passengers,
  flightData,
  clickedCard,
  showMap,
  stopCodes,
  setDepartCode,
  setArriveCode,
  setDepartDate,
  setReturnDate,
  setPassengers,
  setFlightData,
  setClickedCard,
  setShowMap,
  setStopCodes,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyARgEWVzXfMVGVtrXFmZHJwdL5yqxYFL_k",
  });
  
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  
  const coords = [getCoords(departCode), getCoords(arriveCode)];
  
  const center = {
    lat: (coords[0].lat + coords[1].lat) / 2,
    lng: (coords[0].lng + coords[1].lng) / 2,
  };

  const departCoords = [];
  const returnCoords = [];
  
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={
          window.innerWidth < 800
          ? 2
            : window.innerWidth > 800 && window.innerWidth < 1400
            ? 3
            : 4
          }
        center={center}
        options={options}
      >
        {stopCodes.departCodes.length > 0
          ? (stopCodes.departCodes.map(
              (coord) => (
                (coord = getCoords(coord)),
                departCoords.push(coord),
                (
                  <MarkerF
                  key={coord.lat}
                    position={{ lat: coord.lat, lng: coord.lng }}
                  />
                )
              )
            ),
            stopCodes.returnCodes.map(
              (coord) => (
                (coord = getCoords(coord)),
                returnCoords.push(coord),
                (
                  <MarkerF
                    key={coord.lat}
                    position={{ lat: coord.lat, lng: coord.lng }}
                    />
                    )
                    )
                    ),
                    (
              <>
                <PolylineF
                  path={departCoords}
                  options={{
                    geodesic: false,
                    strokeOpacity: 0,
                    strokeWeight: 2,
                    strokeColor: green[500],
                    icons: [
                      {
                        icon: {
                          path: "M 0,0 0,1",
                          strokeOpacity: 1,
                          strokeWeight: 2,
                          scale: 3,
                        },
                        repeat: "10px",
                      },
                    ],
                  }}
                />

                <PolylineF
                  path={returnCoords}
                  options={{
                    geodesic: false,
                    strokeOpacity: 0,
                    strokeWeight: 2,
                    strokeColor: red[500],
                    icons: [
                      {
                        icon: {
                          path: "M 0,0 0,1",
                          strokeOpacity: 1,
                          strokeWeight: 2,
                          scale: 3,
                        },
                        repeat: "10px",
                      },
                    ],
                  }}
                />
              </>
            ))
            : (coords.map((coord) => (
              <MarkerF
                key={coord.lat}
                position={{ lat: coord.lat, lng: coord.lng }}
              />
              )),
              (
                <PolylineF
                path={coords}
                options={{
                  geodesic: false, // set to true to draw a curved line -- need to adjust zoom level to account for this
                  strokeOpacity: 0,
                  strokeWeight: 2,
                  strokeColor: red[500],
                  icons: [
                    {
                      icon: {
                        path: "M 0,0 0,1",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        scale: 3,
                      },
                      repeat: "10px",
                    },
                  ],
                }}
                />
                ))}
        ,
        <TripForm
          departCode={departCode}
          arriveCode={arriveCode}
          departDate={departDate}
          returnDate={returnDate}
          passengers={passengers}
          flightData={flightData}
          showMap={showMap}
          setDepartCode={setDepartCode}
          setArriveCode={setArriveCode}
          setDepartDate={setDepartDate}
          setReturnDate={setReturnDate}
          setPassengers={setPassengers}
          setFlightData={setFlightData}
          setShowMap={setShowMap}
          setStopCodes={setStopCodes}
          setClickedCard={setClickedCard}
        />
        <Result
          flightData={flightData}
          clickedCard={clickedCard}
          showMap={showMap}
          stopCodes={stopCodes}
          setClickedCard={setClickedCard}
          setShowMap={setShowMap}
          setStopCodes={setStopCodes}
        />
      </GoogleMap>
    </div>
  );
}

export default Map;
