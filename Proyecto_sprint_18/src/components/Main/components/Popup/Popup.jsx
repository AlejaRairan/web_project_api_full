import close from "../../../../images/closeIcon.svg";
import { useEffect } from "react";

export default function Popup(props) {
  
  const { title, children, onClose, isOpen } = props;
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc); // limpia al desmontar
  }, [onClose]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        >
          <img src={close} alt="Close" className="popup__close-icon" />
        </button>
        <h3 className="popup__title">{title}</h3>
        {children}
        
      </div>
    </div>
  );
}
