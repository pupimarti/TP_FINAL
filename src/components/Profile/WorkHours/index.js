import React, { useState } from "react";
import "./css.css";

import {ReactComponent as Clock} from 'img/clock.svg';

export default function WorkHours(props) {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const today = new Date().getDay();

  const parse_number_to_hours = (number) => {
      const hours = number.toString().substr(0, 2);
      const minutes = number.toString().substr(2,3);
      return hours + ":" + minutes + "hs";
  }

  const get_hours_day = (day) => {
    if (!day.open) return <p>Cerrado</p>;
    if (!day.time || !Array.isArray(day.time) || day.time.length <= 0) return <p>Los horarios de este día no se encuentran registrados.</p>;
    let arr_hours = [];
    for(let i = 0; i < day.time.length; i++){
      if(i > 0){
        if(i % 2 !== 0) arr_hours.push(<p key={i}>{parse_number_to_hours(day.time[i - 1])} a {parse_number_to_hours(day.time[i])}</p>);
      }
    }
    /* if (day.time.length >= 1) arr_hours.push(<p key={0}>{parse_number_to_hours(day.time[0])} a {parse_number_to_hours(day.time[1])}</p>); */
    return arr_hours;
  };

/*   const get_class_day = (day) => {
    let class_day = "workhours-day";
    if(!get_open_day(day))
        class_day += " day-closed"
    if(day === today)
        class_day += " day-select";
    return class_day;
  }

  const get_open_day = (day) => props.time[day] && props.time[day].open;
 */
  const [showAll, setShowAll] = useState(false);
  

  if(!props.time)
    return null

  return (
    <div style={{'marginBottom': '15px'}}>
      <div onClick={() => setShowAll(!showAll)} className="container-workhours">
        <Clock className="workhours-icon" />
        <div className="workhours-hours">{get_hours_day(props.time[today])}</div>
        <div className={`workhours-arrow back ${showAll ? 'showall' : ''}`}></div>
      </div>
      {showAll &&
        <ul>
        {days &&
          days.map((d, i) => (
            <li
              key={i}
              className="container-workhours"
            >
              <p className={`workhours-day ${i === today ? ' day-select' : ''}`}>{d}</p>
              <div className={`workhours-hours ${i === today ? ' day-select' : ''}`}>{get_hours_day(props.time[i])}</div>
            </li>
          ))}
      </ul>
      }
    </div>
  );
}


/*
<ul className="workhours-days">
        {days &&
          days.map((d, i) => (
            <li
              key={i}
              className={get_class_day(i)}
              onClick={() => setSelect(i)}
            >
              {d}
            </li>
          ))}
      </ul>
      <ul className={get_open_day(select) ? "workhours-hours" : "workhours-hours hours-closed"}>{get_hours_day()}</ul>
*/