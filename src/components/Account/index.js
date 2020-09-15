import React, { useContext } from 'react';
import './css.css';

import UserContext from 'components/Context/UserContext';

import { SignOut } from "firebaseController";

export default function Account() {

    const {user} = useContext(UserContext)

    return (
        <div>
          <h1>Bienvenido {user.email}</h1>
          <button onClick={SignOut}>Cerrar sesion</button>
        </div>
    )
}
