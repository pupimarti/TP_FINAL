import React from "react";

import { ReactComponent as Phone } from "img/telefono.svg";
import { ReactComponent as WhatsApp } from "img/whatsapp.svg";

import placeOpen from 'components/functions/placeOpen';

import { Img } from "react-image";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

function Item(props) {
  const isOpen = () => {
    if (props.send === "encargue")
      return <p className="list-state state-encargue">SÓLO ENCARGUE PREVIO</p>;
    if (props.workHours) {
      const open = placeOpen(props.workHours);
      console.log(open);
      if (open === "no-register") return null;
      if (open) return <p className="list-state state-open">ABIERTO</p>;
      else return <p className="list-state state-closed">CERRADO</p>;
    }
    return null;
  };

  return (
    <div className="container-list-item">
      <Link to={"/" + props.id} className="list-item ripple">
        <div className="list-container-img">
          <Img
            src={[
              "https://firebasestorage.googleapis.com/v0/b/pinamar-pide.appspot.com/o/logos%2F" +
                props.id +
                ".jpg?alt=media",
              "https://firebasestorage.googleapis.com/v0/b/pinamar-pide.appspot.com/o/telefono.svg?alt=media",
            ]}
            className="list-img"
            loader={<Loading small />}
          />
        </div>

        <div className="list-container-name-info">
          <h3 className="list-name">{props.name}</h3>
          <p className="list-info">{props.phone}</p>
          {isOpen()}
        </div>
      </Link>
      {props.phone && (
        <div>
          <a
            href={"tel:+549" + props.phone}
            className="container-button-list-item"
          >
            <Phone className="list-phone" />
          </a>
          <a
            href={
              "https://api.whatsapp.com/send?phone=[+549][ " + props.phone + "]"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="container-button-list-item-wpp"
          >
            <WhatsApp className="list-wpp" />
          </a>
        </div>
      )}
    </div>
  );
}

export default React.memo(Item);
