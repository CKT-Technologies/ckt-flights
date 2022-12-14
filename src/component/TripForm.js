import React from "react";
import "./TripForm.css";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import items from "../data/airports.json";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";

// import moment from "moment";

function TripForm({
  departCode,
  arriveCode,
  departDate,
  returnDate,
  passengers,
  flightData,
  showMap,
  setDepartCode,
  setArriveCode,
  setDepartDate,
  setReturnDate,
  setPassengers,
  setFlightData,
  setShowMap,
  setStopCodes,
  setClickedCard
}) {
  const [alignment, setAlignment] = React.useState("round-trip");

  const handleOnSearch = (string, results) => {
    // onSearch will have the first callback parameter as
    // the string searched. For the second, the results.
    // return string, results;
  };

  const handleOnHover = (result) => {
    // the item hovered
    return result;
  };

  const handleOnSelectDepart = (item) => {
    // the item selected
    setDepartCode(item.code);
    setFlightData([]);
    setStopCodes({"departCodes": [], "returnCodes": []});
    // return item;
  };
  
  const handleOnSelectArrive = (item) => {
    // the item selected
    setArriveCode(item.code);
    setFlightData([]);
    setStopCodes({"departCodes": [], "returnCodes": []});
    // return item;
  };

  const handleOnSelectPassengers = (item) => {
    // the item selected
    setPassengers(item.target.value);
    // return item;
  };

  const handleOnSelectDepartDate = (item) => {
    // the item selected
    item = formatDate(item)
    setDepartDate(item);
    // return item;
  };
  const
   handleOnSelectReturnDate = (item) => {
    // the item selected
    item = formatDate(item)
    setReturnDate(item);
    // return item;
  };

  const handleOnFocus = () => {
  };

  const formatDate = (date) => {
    const day = '0' + date["$D"];
    const month = date["$M"] + 1;
    const year = date["$y"];
    return `${year}-${month}-${day.slice(-2)}`;
  };

  const handleOnSubmit = () => {
    setFlightData([]);
    setStopCodes({"departCodes": [], "returnCodes": []});
    setClickedCard("");
    
    
    
    axios.post("/api", 
    {
      "departCode": departCode,
      "arriveCode": arriveCode,
      "departDate": departDate,
      "returnDate": returnDate,
      "passengers": passengers
    })
      .then((res) => {
        setFlightData(res.data);
      })
      .catch((err) => {
      });
      
    };
    
  const formatResult = (item) => {
    return (
      <>
        <span>
          {item.code} - {item.name1}
        </span>
      </>
    );
  };
  
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div className={showMap ? "container formContainer hide" : "container formContainer"}>
      <div className="col-10 offset-1">
        <div className="container-fluid border rounded" id="form">
          <div className="row pt-3 px-3">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="one-way" variant="outlined" color="success">
                One way
                <TrendingFlatIcon />
              </ToggleButton>
              <ToggleButton
                value="round-trip"
                variant="outlined"
                color="success"
              >
              {/* <span className={isLoading ? "loader" : null}></span> */}
                Round-trip
                <SyncAltIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="row p-3">
            <div className="col px-2">
              <ReactSearchAutocomplete
                items={items}
                fuseOptions={{ keys: ["code", "name"] }}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelectDepart}
                onFocus={handleOnFocus}
                placeholder="Departure"
                autoFocus
                formatResult={formatResult}
                styling={{ zIndex: 2 }}
                required
              />
            </div>
            <div className="col px-2">
              <ReactSearchAutocomplete
                items={items}
                fuseOptions={{ keys: ["code", "name"] }}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelectArrive}
                onFocus={handleOnFocus}
                placeholder="Destination"
                autoFocus
                formatResult={formatResult}
                styling={{ zIndex: 2 }}
                required
              />
            </div>
            <div className="col px-2">
              <select
                type="number"
                className="form-control"
                id="passengersInput"
                placeholder="     Passengers"
                style={{
                  height: "44px",
                  border: "1px solid #dfe1e5",
                  borderRadius: "24px",
                  backgroundColor: "white",
                  boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                  hoverBackgroundColor: "#eee",
                  color: "#212121",
                  fontSize: "16px",
                  fontFamily: "Arial",
                  iconColor: "grey",
                  lineColor: "rgb(232, 234, 237)",
                  placeholderColor: "grey",
                }}
                onChange={handleOnSelectPassengers}
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
                
              </select>
            </div>
          </div>
          <div className="row px-2">
            {alignment === "one-way" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="col-6 px-2"
                  label="Departure Date"
                  onChange={handleOnSelectDepartDate}
                  value={departDate}
                  renderInput={(params) => <TextField {...params} />}
                  required
                />
              </LocalizationProvider>
            ) : (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="col px-2"
                    label="Departure Date"
                    onChange={(newValue) => {
                      handleOnSelectDepartDate(newValue);
                    }}
                    value={departDate}
                    renderInput={(params) => <TextField {...params} />}
                    required
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="col px-2"
                    label="Return Date"
                    onChange={(newValue) => {
                      handleOnSelectReturnDate(newValue);
                    }}
                    value={returnDate}
                    renderInput={(params) => <TextField {...params} />}
                    required
                  />
                </LocalizationProvider>
              </>
            )}
          </div>
          <div className="row p-3">
            <div className="col"></div>
            <button
              type="submit"
              className="col-6 btn btn-ckt"
              onClick={handleOnSubmit}
            >
              Search
            </button>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripForm;
