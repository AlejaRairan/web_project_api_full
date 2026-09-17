import React from "react";
import closeIcon from "../../images/closeIcon.svg";
import registeredIcon from "../../images/Registered.svg";
import errorIcon from "../../images/error.svg";

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  console.log("isOpen en InfoTooltip.jsx:", isOpen);
  if (!isOpen) {
    return null;
  }
  return (
    <div className="register">
      <div className="register__card">
        <button type="button" className="register__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" className="register__close-icon" />
        </button>
        <div
          className={`register__info-icon ${isSuccess ? "register__info-icon_success" : "register__info-icon_error"}`}
          style={{
            backgroundImage: `url(${isSuccess ? registeredIcon : errorIcon})`,
          }}
        />
        <h2 className="register__popup-title">
          {isSuccess
            ? "¡Correcto! Ya estás registrado"
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
};
export default InfoTooltip;
