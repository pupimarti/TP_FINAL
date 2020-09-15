import React, { useContext, useEffect, useState } from "react";
import "./css.css";

import UserContext from "components/Context/UserContext";

import { Link } from 'react-router-dom';
import { getAccount, SignOut } from "firebaseController";
import Loading from "components/Loading";

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

  if (account === "error")
    return (
      <div>
        <p>Ocurrió un error al buscar su cuenta</p>
        <button onClick={() => setAccount("loading")}>Reintentar</button>
      </div>
    );

  return (
    <div>
      <h1>Bienvenido {user.email}</h1>
      <Link to="/edit">Editar</Link>
      <button onClick={SignOut}>Cerrar sesion</button>
    </div>
  );
}
