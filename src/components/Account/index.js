import React, { useContext } from 'react';
import './css.css';

import UserContext from 'components/Context/UserContext';

import { SignOut } from "firebaseController";
import { Link } from 'react-router-dom';

export default function Account() {

    const {user} = useContext(UserContext)

    return (
        <div>
          <h1>Bienvenido {user.email}</h1>
          <Link to="/edit">Editar</Link>
          <button onClick={SignOut}>Cerrar sesion</button>
        </div>
    )
}
