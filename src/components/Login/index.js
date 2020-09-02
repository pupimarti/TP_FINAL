import React, { useState } from "react";
import "./css.css";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassowrd] = useState("");

  return (
    <form>
      <div className="login">
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
          <a href="www.google.com">Olvidé mi contraseña</a>
        </div>
      </div>
    </form>
  );
}
