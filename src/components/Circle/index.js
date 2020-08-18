import React from 'react';
import './css.css';

import {Link} from 'react-router-dom';

import {ReactComponent as Comida} from "img/comida.svg";
import {ReactComponent as Helado} from "img/helado.svg";
import {ReactComponent as Bebidas} from "img/cerveza.svg";

export default function Circle(props) {
    return (
        <Link to={props.url} className="content-circle">
            {props.name === "Helado" && <Helado className="circle-img" />}
            {props.name === "Bebidas" && <Bebidas className="circle-img" />}
            {props.name === "Comida" && <Comida className="circle-img" />}
            <p className="circle-text">{props.name}</p>
        </Link>
    )
}
