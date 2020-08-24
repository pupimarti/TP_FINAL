import React from 'react';
import './css.css';
import search from 'img/buscar.svg';

export default function Search(props) {
    return (
        <div className="container-search">
            <img className="search-icon" src={search} alt="Buscar" />
            <input value={props.value} onChange={(e) => props.setValue(e.target.value)} placeholder="Buscar" className="search-input" />
        </div>
    )
}
