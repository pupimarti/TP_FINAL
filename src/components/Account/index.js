import React, { useContext, useEffect } from "react";
import "./css.css";

import UserContext from "components/Context/UserContext";
import { getAccount, SignOut } from "firebaseController";
import logo from "img/logo-completo.png";
import Loading from "components/Loading";
import { Link } from "react-router-dom";
import ListRequests from "components/Admin/ListRequests";

export default function Account() {
  const { user, account, setAccount } = useContext(UserContext);

  useEffect(() => {
    if (account === "loading")
      getAccount()
        .then(setAccount)
        .catch((e) => {
          console.log(e);
          setAccount("error");
        });
  }, [account, setAccount]);

  const handleSignOut = () => {
    setAccount("loading");
    SignOut();
  };

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
        <button className="button transparent" onClick={SignOut}>
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
        <p className="account-message">Ocurrió un error al buscar su cuenta</p>
        <button className="button" onClick={() => setAccount("loading")}>
          Reintentar
        </button>
      </div>
    );

  if (account.admin) {
    return (
      <div className="content-account fade-in">
        <header className="main-content-logo">
          <img src={logo} alt="logo" className="main-logo" />
        </header>
        <h2 style={{ textAlign: "center" }}>Administrador</h2>
        <Link to="/main" className="button">
          Ver listado
        </Link>
        <ListRequests />
        <button className="button transparent" onClick={handleSignOut}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="content-account fade-in">
      <header className="main-content-logo">
        <img src={logo} alt="logo" className="main-logo" />
      </header>
      {account.create ? (
        <>
          <p className="account-message">
            ¡Su cuenta ha sido activada! Ya puedes crear tu perfil.
          </p>
          <Link to="/create" className="button">
            Crear mi perfil
          </Link>
        </>
      ) : (
        <Link to="/edit" className="button">
          Editar perfil
        </Link>
      )}
      <Link to="/main" className="button">
        Ver listado
      </Link>
      <button className="button transparent" onClick={handleSignOut}>
        Cerrar sesión
      </button>
    </div>
  );
}
