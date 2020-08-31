import React, { useState, useEffect } from "react";
import "./css.css";

import { useLocation, Link } from "react-router-dom";
import Loading from "components/Loading";

import logo from "img/logo-completo.png";
import phone from "img/telefono.svg";
import { ReactComponent as Whatsapp } from "img/whatsapp.svg";
import { ReactComponent as Facebook } from "img/facebook.svg";
import { ReactComponent as Instagram } from "img/instagram.svg";
import { ReactComponent as Share } from "img/share.svg";
import { ReactComponent as Location } from "img/location.svg";
import { Img } from "react-image";

import { getPlace } from "firebaseController";

import placeOpen from "components/functions/placeOpen";
import WorkHours from "./WorkHours";

export default function Profile() {
  const id = useLocation().pathname.substr(1);

  const [data, setData] = useState("loading");

  useEffect(() => {
    let mounted = true;

    const get_place = async () => {
      const place = await getPlace(id);
      if (mounted) setData(place);
    };

    if (data === "loading") get_place();

    return () => (mounted = false);
  }, [id, data]);

  const getBack = () => {
    if (data && data.type) return "/" + data.type;
    return "/";
  };

  const isOpen = () => {
    const open = placeOpen(data.workHours);
    if (open === "no-register") return null;
    if (open) return <p className="profile-state state-open">ABIERTO</p>;
    else return <p className="profile-state state-closed">CERRADO</p>;
  };

  return (
    <div className="container-profile">
      <header className="navbar">
        <Link to={getBack()} className="container-back">
          <div className="back"></div>
        </Link>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
      </header>
      {data === null ? (
        <h1>Sitio incorrecto</h1>
      ) : data === "loading" ? (
        <Loading />
      ) : (
        <div className="profile-container-place fade-in">
          <Img
            src={[
              "https://firebasestorage.googleapis.com/v0/b/pinamar-pide.appspot.com/o/logos%2F" +
                id +
                ".jpg?alt=media",
              "https://firebasestorage.googleapis.com/v0/b/pinamar-pide.appspot.com/o/telefono.svg?alt=media",
            ]}
            alt={data.name}
            className="profile-image"
            loader={
              <div className="profile-image-container-loading">
                <Loading small />
              </div>
            }
          />
          <div className="profile-container-main">
            <h2 className="profile-name">{data.name}</h2>
          </div>
          <div className="container-open">
            {data.send === "encargue" && (
              <>
                <p className="profile-state-send state-encargue">
                  SÓLO ENCARGUE PREVIO
                </p>
                <p className="info-encargue">
                  Los lugares con 'sólo encargue previo' realizan envíos
                  determinados días con previo encargue
                </p>
              </>
            )}
            {data.workHours && isOpen()}
          </div>
          {data.address && (
            <div>
             <a href="https://www.google.com/search?sxsrf=ALeKk02EkI55dX61ainPauFNwHtK6bPIxA:1598895035374&ei=GzJNX_L9HKSf5OUP8Yu7
             -A4&q=havanna%20pinamar&oq=havanna+pinamar&gs_lcp=CgZwc3ktYWIQAzIECCMQJzICCAAyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBY
             QHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjICCCY6CAgAELEDEIMBOgUIABCxAzoCCC46CAguELEDEIMBOgYIIxAnEBM6BwguELEDEEM6BAgAEEM6Cggu
             ELEDEIMBEEM6BAguEEM6BwgAELEDEEM6BwgAEBQQhwI6BwgAEAoQywE6BQgAEMsBOgQIABAKOggIABAWEAoQHlCOnxlYzKsZYJysGWgAcAB4AIAB_wGIA
             dYMkgEFOS4yLjOYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=2ahUKEwixgveU_MXrAhVRILkGHdyyC38QvS4wAXoECAsQIA&uact=5&nps
             ic=0&rflfq=1&rlha=0&rllag=-37114314,-56862927,244&tbm=lcl&rldimm=12422196118677511887&lqi=Cg9oYXZhbm5hIHBpbmFtYXIiA4g
             BAVoaCgdoYXZhbm5hIg9oYXZhbm5hIHBpbmFtYXI&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!2m1!1e3!3sIAE,lf:1,lf_ui:4&rlst=f#rlfi=
             hd:;si:;mv:[[-37.0778665,-56.8320156],[-37.1698167,-56.9059976]]" 
             target="_blank"
             rel="noopener noreferrer"
             className="profile-ubication"
             >
             {data.address}
             </a> 
            </div>
          )}
          {data.phone && (
            <div>
              <a href={"tel:+549" + data.phone} className="profile-call">
                <img src={phone} className="profile-phone" alt="Llamar" />
                Llamar al {data.phone}
              </a>
            </div>
          )}
          <div className="container-redes">
            {data.instagram && (
              <div>
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="container-red"
                >
                  <Instagram className="profile-red" />
                  <span>Instagram</span>
                </a>
              </div>
            )}
            {data.facebook && (
              <div>
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="container-red"
                >
                  <Facebook className="profile-red" />
                  <span>Facebook</span>
                </a>
              </div>
            )}
            {data.whatsapp && (
              <div>
                <a
                  href={"https://wa.me/" + data.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="container-red"
                >
                  <Whatsapp className="profile-red" />
                  <span>Whatsapp</span>
                </a>
              </div>
            )}
            <div>
              <a
                href={
                  "https://api.whatsapp.com/send?text=" +
                  data.name.replace(/\s/g, "%20") +
                  "%20https%3A%2F%2Fdolores-pide.com.ar%2F%23%2F" +
                  id +
                  "%20"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="container-red"
              >
                <Share className="profile-red share-icon" />
                <span>Compartir</span>
              </a>
            </div>
          </div>
          <WorkHours time={data.workHours} />
          {data.location && data.urlLocation && (
            <div>
              <a
                href={data.urlLocation}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginBottom: "15px" }}
                className="container-workhours"
              >
                <Location className="workhours-icon" />
                <p className="workhours-hours">{data.location}</p>
              </a>
            </div>
          )}

          {data.location && !data.urlLocation && (
            <div
              style={{ marginBottom: "15px" }}
              className="container-workhours"
            >
              <Location className="workhours-icon" />
              <p className="workhours-hours">{data.location}</p>
            </div>
          )}

          {data.desc && <p className="profile-desc">{data.desc}</p>}
        </div>
      )}
    </div>
  );
}
