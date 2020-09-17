import React, { useState } from "react";
import "./css.css";

import ImageUploader from 'react-images-upload';
import { Link } from "react-router-dom";
import logo from "img/logo-completo.png";
import Loading from "components/Loading";
import { editProfile } from "firebaseController";

export default function Edit() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wpp, setWpp] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([0])

  const handleImage = (picture) => {
    setImage(picture)
  }

  const handleEditProfile = () => {
    setLoading(true);
    editProfile({
      name,
      address,
      phone,
      instagram: insta,
      facebook: fb,
      whatsapp: wpp,
      category,
    })
      .then(() => {
        alert('modificado con exito');
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        alert('error al modificar')
        setLoading(false);
      });
  };

  if (loading)
    return (
      <div className="container-profile">
        <header className="navbar">
          <Link to="/" className="container-back">
            <div className="back"></div>
          </Link>
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </header>
        <Loading />
      </div>
    );
console.log(image)
  return (
    <div className="container-profile">
      <header className="navbar">
        <Link to="/" className="container-back">
          <div className="back"></div>
        </Link>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
      </header>
      <ImageUploader
                fileContainerStyle = {{background: "transparent"}}
                withIcon={true}
                withPreview={true}
                buttonText='Subir logo'
                onChange={handleImage}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
      <div className="profile-container-place fade-in">
        <div className="profile-container-main">
          <h2 className="profile-name">Perfil</h2>
        </div>
        <div>
          <select
            className="profile-select"
            name="um"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option
              value="categorie"
              style={{ color: "rgba(34, 36, 38, 0.247)" }}
            >
              Seleccionar categoria
            </option>
            <option value="Comida">Comida</option>
            <option value="Helado">Helado</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </div>
        <div>
          <input
            className="profile-call"
            name="name"
            type="text"
            value={name}
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="address"
            type="text"
            value={address}
            placeholder="Dirección"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="phone"
            type="text"
            value={phone}
            placeholder="Teléfono"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="whatsapp"
            type="text"
            value={wpp}
            placeholder="Whatsapp"
            onChange={(e) => setWpp(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="facebook"
            type="text"
            value={fb}
            placeholder="Usuario facebook"
            onChange={(e) => setFb(e.target.value)}
          />
        </div>
        <div>
          <input
            className="profile-call"
            name="instagram"
            type="text"
            value={insta}
            placeholder="Usuario instagram"
            onChange={(e) => setInsta(e.target.value)}
          />
        </div>
      </div>
      <div className="container-button-profile">
        <button className="button" onClick={handleEditProfile}>
          Guardar cambios
        </button>
        <Link to="/" className="button transparent">
          Atrás
        </Link>
      </div>
    </div>
  );
}
