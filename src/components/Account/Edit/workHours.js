import React from "react";
import NumberFormat from "react-number-format";

export default function WorkHours(props) {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const handleSetWorkHours = (i, e) => {
    const value = e.target.value;
    let wh = [...props.workHours];
    wh[i].open = value === "true" ? true : false;
    /* if (value) wh[i].time = defaultHours.slice();
	else  */
    wh[i].time = null;
    props.setWorkHours([...wh]);
  };

  const handleSetHours = (day, input, value) => {
    let wh = [...props.workHours];
    wh[day].time[input] = value;
    props.setWorkHours([...wh]);
  };

  const handleAddHours = (day) => {
    let wh = [...props.workHours];
    if (!Array.isArray(wh[day].time)) wh[day].time = [];
    wh[day].time.push("0000");
    wh[day].time.push("0000");
    props.setWorkHours([...wh]);
  };

  const handleRemoveHours = (day) => {
    let wh = [...props.workHours];
    if (!Array.isArray(wh[day].time)) wh[day].time = [];
    wh[day].time.pop();
    wh[day].time.pop();
    props.setWorkHours([...wh]);
  };

  /* const [defaultHours, setDefaultHours] = useState([2000, 2300]); */

  /* const handleSetDefaultHours = (hours) => {
    setDefaultHours(hours);
  }; */

  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "00";
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "00";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function cardExpiry(val) {
    let hours = limit(val.substring(0, 2), "23");
    let minutes = limit(val.substring(2, 4), "59");

    return hours + (minutes.length ? ":" + minutes : "");
  }

  return (
    <div>
      {props.workHours &&
        props.workHours.map((d, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{days[i]}</p>
              {/* <input
                type="checkbox"
                checked={d.open}
                onChange={(e) => handleSetWorkHours(i, e)}
              /> */}
              <select
                className="schedule-select"
                name="sunday"
                value={d.open}
                onChange={(e) => handleSetWorkHours(i, e)}
              >
                <option
                  value="categorie"
                  style={{ color: "rgba(34, 36, 38, 0.247)" }}
                >
                  Horarios
                </option>
                <option value={true}>Abierto</option>
                <option value={false}>Cerrado</option>
              </select>
            </div>
            {d.open === true && (
              <button onClick={() => handleAddHours(i)}>
                Agregar horario {days[i]}
              </button>
            )}
            <div className="container-inputs-schedule">
              {Array.isArray(d.time) &&
                d.time.map((t, iT) => (
                  <div key={iT} style={{ width: "40%" }}>
                    <NumberFormat
                      value={t}
                      format={cardExpiry}
                      className="schedule-input"
                      placeholder="HH/MM"
                      onValueChange={(values) => {
                        const { value } = values;
                        handleSetHours(i, iT, parseInt(value));
                      }}
                    />
                  </div>
                ))}
            </div>
            {d.open && (
              <button
                onClick={() => handleRemoveHours(i)}
                style={{ backgroundColor: "red", width: "100%" }}
              >
                Quitar horarios {days[i]}
              </button>
            )}
            {/* {d.open && (
              <button
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={() => handleSetDefaultHours(d.time)}
              >
                Establecer default estos horarios {days[i]}
              </button>
            )} */}
          </div>
        ))}
    </div>
  );
}
