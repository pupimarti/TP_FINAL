import React, { useState } from "react";
import "./css.css";
import { Link } from "react-router-dom";
import { createAccount } from "firebaseController";
import Loading from "components/Loading";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const getError = (e) => {
    if (e) {
      switch (e) {
        case "auth/invalid-email":
          return "El mail ingresado no es válido.";
        case "auth/email-already-in-use":
          return "El mail ingresado ya está en uso.";
        case "auth/weak-password":
          return "La contraseña debe tener como mínimo 6 carácteres";
        case "error-create":
          return "Se ha producido un error al crear la solicitud de cuenta.";
        default:
          return "Se ha producido un error al registrarse.";
      }
    }
    return "";
  };

  const checkInputs = () => {
    if (confirmPassword !== password) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!checkInputs()) return;
    setLoading(true);
    createAccount(mail, password).catch((e) => {
      console.log(e);
      setLoading(false);
      setError(getError(e.message));
    });
  };

  return (
    <form onSubmit={handleCreateAccount}>
      <div className="register">
        <Link to="/" className="register-header">
          <div className="back"></div>
          <h1 className="login-pc">PINAMAR-PIDE</h1>
        </Link>

        {loading ? (
          <div className="login-box login-box-loading">
            <Loading fullBox />
          </div>
        ) : (
          <div className="register-box">
            <img
              src={require("img/logo.png")}
              alt="avatar"
              className="avatar"
            />
            <h1>Registrarme</h1>
            {error && <p className="message-error">{error}</p>}
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
        )}
      </div>
    </form>
  );
}
