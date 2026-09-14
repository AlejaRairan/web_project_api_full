import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/form/NewCard/NewCard.jsx";
import EditProfile from "./components/form/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/form/EditAvatar/EditAvatar.jsx";
import avatar from "../../images/JacquesCousteau.png";
import editIcon from "../../images/editicon.svg";
import addIcon from "../../images/addicon.svg";
import Card from "./components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { api } from "../../utils/Api.js";
import { useState, useEffect, useContext } from "react";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const [popup, setPopup] = useState(null);
  const { currentUser, handleUpdateUser, handleUpdateAvatar } =
    useContext(CurrentUserContext);

  function handleClosePopup() {
    setPopup(null);
  }
console.log("currentUser en Main.jsx:", currentUser);
  function handleOpenPopup(type, data) {
    if (type === "profile") {
      setPopup({
        title: "Editar perfil",
        children: (
          <EditProfile
            onUpdateUser={handleUpdateUser}
            onClose={handleClosePopup}
          />
        ),
      });
    } else if (type === "avatar") {
      setPopup({
        title: "Actualizar avatar",
        children: (
          <EditAvatar
            onUpdateAvatar={handleUpdateAvatar}
            onClose={handleClosePopup}
          />
        ),
      });
    } else if (type === "card") {
      setPopup({
        title: "Nuevo lugar",
        children: (
          <NewCard
            onAddPlaceSubmit={onAddPlaceSubmit}
            onClose={handleClosePopup}
          />
        ),
      });
    } else if (type === "image") {
      setPopup(data);
    }
  }

  return (
    <main className="main">
      <div className="container">
        <div className="container__wrapper">
        <div className="container__avatar">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="container__image"
          />
          <button
            aria-label="Add image"
            className="container__avatar-button"
            type="button"
            onClick={() => handleOpenPopup("avatar")}
          >
            <img
              src={editIcon}
              alt="Más opciones"
              className="container__edit-icon"
            />
          </button>
        </div>
        <div className="container__details">
          <div>
            <h2 className="container__subtitle" id="nameInput">
              {currentUser?.name}
            </h2>
            <p className="container__description" id="aboutInput">
              {currentUser?.about}
            </p>
          </div>

          <button
            aria-label="Edit profile"
            className="container__edit-button"
            type="button"
            onClick={() => handleOpenPopup("profile")}
          >
            <img
              src={editIcon}
              alt="Editar"
              className="container__edit-icon"
              id="openForm"
            />
          </button>
        </div>
        </div>

        <button
          aria-label="Add card"
          className="container__add-button"
          type="button"
          onClick={() => handleOpenPopup("card")}
        >
          <img
            src={addIcon}
            alt="Más opciones"
            className="container__add-icon"
            id="addButton"
          />
        </button>
      </div>

      <section className="grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            isLiked={card.likes.includes(currentUser?._id)}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
          />
        ))}
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
