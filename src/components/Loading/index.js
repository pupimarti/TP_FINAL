import React from "react";
import "./css.css";

export default function Loading({ small = false, fullBox = false }) {
  if (small)
    return (
      <div id="circleG">
        <div id="circleG_1" className="circleG circleS"></div>
        <div id="circleG_2" className="circleG circleS"></div>
        <div id="circleG_3" className="circleG circleS"></div>
      </div>
    );

  return (
    <div id="circleG"  className={`${fullBox && 'circle-fullbox'}`}>
      <div id="circleG_1" className={`circleG ${small && "circleS"}`}></div>
      <div id="circleG_2" className={`circleG ${small && "circleS"}`}></div>
      <div id="circleG_3" className={`circleG ${small && "circleS"}`}></div>
    </div>
  );
}
