import React, { useState } from "react";
import "./css.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form>
      <div className="register">
        <Link to="/" className="register-header">
          <div className="back"></div>
          <h1>PINAMAR-PIDE</h1>
        </Link>
        <div className="register-box">
          <img src={require("img/logo.png")} alt="avatar" className="avatar" />
          <h1>Registrarme</h1>

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
          <div className="textbox">
            <i className="fas fa-key" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              className="input"
              required
            />
          </div>
          <input type="submit" className="button" value="Vamos" />
          <Link to="/login">
            <p>Ya tengo una cuenta</p>
          </Link>
        </div>
      </div>
    </form>
  );
}
