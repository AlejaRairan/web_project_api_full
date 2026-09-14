import { useState } from "react";
export default function NewCard({ onAddPlaceSubmit, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage); // ← mensaje nativo del navegador
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
  }

  const isValid = !nameError && !linkError && name && link;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onAddPlaceSubmit(name, link);
    onClose();
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="card-name-error">
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error" id="card-link-error">
          {linkError}
        </span>
      </label>

      <button
        className={`button popup__button ${!isValid ? "popup__button_inactive" : ""}`}
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
