import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditProfile({ onUpdateUser, onClose }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");
  const [nameError, setNameError] = useState(""); // ← nuevo
  const [descriptionError, setDescriptionError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.validationMessage);
  };

  const isValid = !nameError && !descriptionError && name && description;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onUpdateUser({ name, about: description });
    onClose();
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="new-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-name"
          name="profile-name"
          type="text"
          placeholder="Name"
          className="popup__input popup__input_type_profile-name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="profile-name-error">
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          id="profile-about"
          name="profile-about"
          placeholder="Acerca de mi"
          className="popup__input popup__input_type_about"
          minLength="2"
          maxLength="40"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error" id="profile-about-error">
          {descriptionError}
        </span>
      </label>
      <button
        type="submit"
        className={`button popup__button ${!isValid ? "popup__button_inactive" : ""}`}
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
