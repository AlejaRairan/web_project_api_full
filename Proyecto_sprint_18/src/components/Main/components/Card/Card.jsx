import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card(props) {
  const { card, isLiked, onCardLike, onCardDelete, onOpenPopup, onClosePopup } = props;
const { name, link } = card;

  const imageComponent = {
    title: "Vista de imagen",
    children: <ImagePopup card={card} onClose={onClosePopup} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onOpenPopup("image", imageComponent)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => onCardDelete(card._id)}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}