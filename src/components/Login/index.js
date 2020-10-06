import React, { useContext, useState } from "react";
import "./css.css";
import { Link } from "react-router-dom";

//firebase
import app from "firebaseController";
import Loading from "components/Loading";
import UserContext from "components/Context/UserContext";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassowrd] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const { setAccount } = useContext(UserContext);

  const getError = (e) => {
    if (e) {
      switch (e.code) {
        case "auth/user-not-found":
          return "El e-mail introducido no pertenece a ninguna cuenta.";
        case "auth/wrong-password":
          return "Tu contraseña no es correcta. Vuelve a comprobarla.";
        case "auth/user-disabled":
          return "Su cuenta fue deshabilitada.";
        default:
          return "Usuario o contraseña incorrectos.";
      }
    }
    return "";
  };

  const handleLoginMail = (e) => {
    e.preventDefault();
    setLoading(true);
    setAccount("loading");
    app
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .catch((e) => {
        setLoading(false);
        setError(getError(e));
      });
  };

  // const signInUser = () => {
  //   setMail("user@user.com");
  //   setPassowrd("user1234");
  // };

  return (
    <form onSubmit={(e) => handleLoginMail(e)}>
      <div className="login">
        <Link to="/" className="login-header">
          <div className="back"></div>
          <h1 className="login-pc">PINAMAR-PIDE</h1>
        </Link>
        {loading ? (
          <div className="login-box login-box-loading">
            <Loading fullBox />
          </div>
        ) : (
          <div className="login-box">
            <img
              src={require("img/logo.png")}
              alt="avatar"
              className="avatar"
            />
            <h1>Iniciar Sesión</h1>
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
            <input type="submit" className="button" value="Vamos" />
            <Link to="/register">
              <p>No tengo una cuenta</p>
            </Link>
          </div>
        )}
        {/* <button onClick={signInUser}>ingresar como usuario</button> */}
      </div>
    </form>
  );
}
