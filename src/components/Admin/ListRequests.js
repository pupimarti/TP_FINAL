import Loading from "components/Loading";
import {
  acceptAccountRequest,
  getAccountsRequest,
  refuseAccountRequest,
} from "firebaseController";
import React, { useEffect, useState } from "react";
import "./css.css";

export default function ListRequests() {
  const [shopsRequests, setShopsRequests] = useState("loading");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shopsRequests === "loading") {
      getAccountsRequest()
        .then(setShopsRequests)
        .catch((e) => {
          console.log(e);
          setShopsRequests("error");
        });
    }
  }, [shopsRequests]);

  const handleAccept = (uid) => {
    if (!uid) return;
    setLoading(true);
    acceptAccountRequest(uid)
      .then(() => {
        setLoading(false);
        alert("Aceptado con exito");
        setShopsRequests("loading");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        alert("Ocurrio un error");
      });
  };

  const handleRefuse = (uid) => {
    if (!uid) return;
    setLoading(true);
    refuseAccountRequest(uid)
      .then(() => {
        setLoading(false);
        alert("Rechazado con exito");
        setShopsRequests("loading");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        alert("Ocurrio un error al rechazar");
      });
  };

  if (shopsRequests === "loading" || loading) return <Loading />;

  if (shopsRequests === "error")
    return <p>Ocurrió un error al cargar el listado</p>;

  if (shopsRequests.length <= 0) {
    return (
      <div>
        <button
          style={{ margin: "0 auto" }}
          className="button"
          onClick={() => setShopsRequests("loading")}
        >
          Actualizar
        </button>
        <p style={{ textAlign: "center" }}>No hay solicitudes disponibles</p>
      </div>
    );
  }

  return (
    <ul className="admin-list-requests">
      <button
        style={{ margin: "0 auto" }}
        className="button"
        onClick={() => setShopsRequests("loading")}
      >
        Actualizar
      </button>
      {shopsRequests &&
        shopsRequests.map((s, i) => (
          <li className="admin-list-request" key={s.id + i}>
            <p className="request-id">
              <b>id: </b>
              {s.id}
            </p>
            <p className="request-email">
              <b>email: </b>
              {s.email}
            </p>
            <div className="request-container-buttons">
              <button className="button" onClick={() => handleAccept(s.id)}>
                Aceptar
              </button>
              <button
                className="button transparent"
                onClick={() => handleRefuse(s.id)}
              >
                Rechazar
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
