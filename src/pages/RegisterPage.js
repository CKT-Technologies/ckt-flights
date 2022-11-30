import React, { useState } from "react";
import "./RegisterPage.css";
import logo from "../assets/logo.png";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [airport, setAirport] = useState("MSP");

  const history = useNavigate();

  return (
    <div>
      <Header />
      <div className="registration">
        <img src={logo} alt="CKT logo" className="reg-logo" />
        <h1>CKT, find all your travel needs!</h1>
        <form className="registerForm">
          <input
            className="registerInput"
            type="text"
            placeholder="First name"
            name="fName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="Last name"
            name="lName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className="registerInput"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="registerInput"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="registerInput"
            type="password"
            placeholder="Confirm Password"
            name="password"
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="Home airport (3 letter airport code)"
            name="airport"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
          />
        </form>
        <button className="registerButton">Register!</button>
      </div>
    </div>
  );
}

export default RegisterPage;
