import React, { useContext, useEffect, useState } from "react";
import "./css.css";

import UserContext from "components/Context/UserContext";
import { getAccount, SignOut } from "firebaseController";
import logo from "img/logo-completo.png";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

export default function Account() {
  const { user } = useContext(UserContext);

  const [account, setAccount] = useState("loading");

  useEffect(() => {
    if (account === "loading")
      getAccount()
        .then(setAccount)
        .catch((e) => {
          console.log(e);
          setAccount("error");
        });
  }, [account]);

  if (account === "loading") return <Loading />;

  if (!account)
    return (
      <div className="content-account fade-in">
        <header className="main-content-logo">
          <img src={logo} alt="logo" className="main-logo" />
        </header>
        <p className="account-message">{user.email}</p>
        <p className="account-message">
          Cuenta creada, espera a que se te autorice para subir tu perfil.
        </p>
        <button className="button" onClick={SignOut}>
          Cerrar sesión
        </button>
      </div>
    );

  if (account === "error")
    return (
      <div className="content-account fade-in">
        <header className="main-content-logo">
          <img src={logo} alt="logo" className="main-logo" />
        </header>
        <p>Ocurrió un error al buscar su cuenta</p>
        <button className="button" onClick={() => setAccount("loading")}>
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="content-account fade-in">
      <header className="main-content-logo">
        <img src={logo} alt="logo" className="main-logo" />
      </header>
      <Link to="/edit" className="button">
        Editar perfil
      </Link>
      <button className="button transparent" onClick={SignOut}>
        Cerrar sesión
      </button>
    </div>
  );
}
