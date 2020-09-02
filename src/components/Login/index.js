import React, { useState } from "react";
import "./css.css";
// import { Link } from "react-router-dom";
// import logo from 'img/logo-completo.png';

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassowrd] = useState("");

  return (
    <form>
      <div className="login">
      {/* <header className="navbar">
        <Link to="/" className="container-back">
          <div className="back"></div>
        </Link>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
      </header> */}
        <div className="login-box">
          <img src={require("img/logo.png")} alt="avatar" className="avatar" />
          <h1>Iniciar Sesión</h1>

          <div className="textbox">
            <i className="fas fa-user" />
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="E-mail"
              className="input"
              required
            />
          </div>
          <div className="textbox">
            <i className="fas fa-lock" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              placeholder="Contraseña"
              className="input"
              required
            />
          </div>
          <input type="submit" className="button" value="Vamos" />
          <div style={{display: "flex",flexDirection: "column"}} >
          <a href="www.google.com">No tengo una cuenta</a>
          </div>
        </div>
      </div>
    </form>
  );
}
