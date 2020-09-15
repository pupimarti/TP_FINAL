import React, { useState } from "react";
import "./css.css";

import { Link } from "react-router-dom";
import logo from "img/logo-completo.png";

export default function Edit() {
  const [data] = useState("loading");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wpp, setWpp] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");

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
            value={name}
            placeholder="Nombre"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="address"
            type="text"
            value={address}
            placeholder="Dirección"
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="phone"
            type="text"
            value={phone}
            placeholder="Teléfono"
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="whatsapp"
            type="text"
            value={wpp}
            placeholder="Whatsapp"
            onChange={e => setWpp(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="facebook"
            type="text"
            value={fb}
            placeholder="Usuario facebook"
            onChange={e => setFb(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="instagram"
            type="text"
            value={insta}
            placeholder="Usuario instagram"
            onChange={e => setInsta(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
