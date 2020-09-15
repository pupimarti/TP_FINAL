import React, { useState } from "react";
import "./css.css";

import { Link } from "react-router-dom";

import logo from "img/logo-completo.png";

export default function Edit() {
  const [data] = useState("loading");

  return (
    <div className="container-profile">
      <header className="navbar">
        <Link to="/" className="container-back">
          <div className="back"></div>
        </Link>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
      </header>

      <div className="profile-container-place fade-in">
        <div className="profile-container-main">
          <h2 className="profile-name">Editar</h2>
        </div>
        <div className="container-open">
          {data.send === "encargue" && (
            <>
              <p className="profile-state-send state-encargue">
                SÓLO ENCARGUE PREVIO
              </p>
              <p className="info-encargue">
                Los lugares con 'sólo encargue previo' realizan envíos
                determinados días con previo encargue
              </p>
            </>
          )}
        </div>
        <div>
          <input
            className="profile-call"
            name="name"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="phone"
            type="text"
            placeholder="Teléfono"
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="whatsapp"
            type="text"
            placeholder="Whatsapp"
          />
        </div>
      </div>
    </div>
  );
}
