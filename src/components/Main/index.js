import React, { useContext } from "react";
import "./css.css";

import logo from "img/logo-completo.png";

import Circle from "components/Circle";
import { Link } from "react-router-dom";
import UserContext from "components/Context/UserContext";

function Main() {
  const { user } = useContext(UserContext);

  const sections = [
    {
      name: "Comida",
      url: "/comida",
    },
    {
      name: "Helado",
      url: "/helado",
    },
    {
      name: "Bebidas",
      url: "/bebidas",
    },
  ];

  return (
    <div className="content-main fade-in">
      <header className="main-content-logo">
        <img src={logo} alt="logo" className="main-logo" />
      </header>
      <div className="content-sections">
        {sections &&
          sections.map((s, i) => <Circle key={i} name={s.name} url={s.url} />)}
      </div>
      {!user && (
        <footer className="container-footer">
          <Link to="/login" className="footer">
            Para publicar tu comercio haz click aquí.
          </Link>
        </footer>
      )}
    </div>
  );
}

export default React.memo(Main);
