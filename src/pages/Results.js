import React from "react";
import Header from "../component/Header";
import Result from "../component/Result";
import "./Results.css";



function Results() {
  const [clickedCard, setClickedCard] = React.useState("");
  return (
    <div className="results">
      <Header />
      <Result clickedCard={clickedCard} setClickedCard={setClickedCard}/>
    </div>
  );
}

export default Results;
