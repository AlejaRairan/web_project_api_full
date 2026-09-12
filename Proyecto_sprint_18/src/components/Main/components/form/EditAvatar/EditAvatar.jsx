import { useRef, useState } from "react";

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  const avatarUrlRef = useRef();
  const [urlError, setUrlError] = useState("");
  const [urlValue, setUrlValue] = useState("");

  function handleUrlChange(e) {
    setUrlValue(e.target.value); // ← agrega esto
    setUrlError(e.target.validationMessage);
  }

  const isValid = !urlError && urlValue.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    onUpdateAvatar({
      avatar: avatarUrlRef.current.value,
    });
    onClose(); // Cierra el popup después de actualizar el avatar
  };

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="new-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="avatar-url"
          name="avatar-url"
          type="url"
          placeholder="URL de la imagen"
          className="popup__input popup__input_type_avatar-url"
          required
          minLength="2"
          maxLength="500"
          ref={avatarUrlRef}
          onChange={handleUrlChange}
        />
        <span className="popup__input-error">{urlError}</span>
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
