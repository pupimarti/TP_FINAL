import React, { useContext, useState } from "react";
import "./css.css";

import ImageUploader from "react-images-upload";
import { Link, useHistory } from "react-router-dom";
import logo from "img/logo-completo.png";
import Loading from "components/Loading";
import { editProfile } from "firebaseController";
import UserContext from "components/Context/UserContext";
import { Img } from "react-image";

export default function Edit({ create = false }) {
  const { account } = useContext(UserContext);

  const history = useHistory();

  if (account === "loading" || !account || account === "error")
    history.push("/");

  const [name, setName] = useState(account.name || "");
  const [address, setAddress] = useState(account.address || "");
  const [phone, setPhone] = useState(account.phone || "");
  const [wpp, setWpp] = useState(account.whatsapp || "");
  const [fb, setFb] = useState(account.facebook || "");
  const [insta, setInsta] = useState(account.instagram || "");
  const [category, setCategory] = useState(account.category || "");

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const handleImage = (picture) => {
    console.log(picture);
    setImage(picture);
  };

  const handleEditProfile = () => {
    setLoading(true);
    editProfile({
      name,
      address,
      phone,
      instagram: insta,
      facebook: fb,
      whatsapp: wpp,
      category: create ? category : null,
      img: image,
    })
      .then(() => {
        alert("modificado con exito");
        setLoading(false);
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        alert("error al modificar");
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
        fileContainerStyle={{ background: "transparent" }}
        withIcon={true}
        withPreview={true}
        singleImage
        buttonText="Subir logo"
        onChange={handleImage}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      {!create && (
        <Img
          src={[
            "https://firebasestorage.googleapis.com/v0/b/pinamar-pide.appspot.com/o/logos%2F" +
              account.uid +
              ".jpg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/pinamar-pide.appspot.com/o/telefono.svg?alt=media",
          ]}
          className="profile-image"
          loader={
            <div className="profile-image-container-loading">
              <Loading small />
            </div>
          }
        />
      )}
      <div className="profile-container-place fade-in">
        <div className="profile-container-main">
          <h2 className="profile-name">Perfil</h2>
        </div>
        <div>
          <select
            className="profile-select"
            name="um"
            disabled={!create}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option
              value="categorie"
              style={{ color: "rgba(34, 36, 38, 0.247)" }}
            >
              Seleccionar categoria
            </option>
            <option value="comida">Comida</option>
            <option value="helado">Helado</option>
            <option value="bebidas">Bebidas</option>
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
          {create ? "Crear perfil" : "Guardar cambios"}
        </button>
        <Link to="/" className="button transparent">
          Atrás
        </Link>
      </div>
    </div>
  );
}
