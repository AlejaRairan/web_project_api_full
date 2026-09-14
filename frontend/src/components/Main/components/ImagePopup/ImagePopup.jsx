export default function ImagePopup(props) {
  const { onClose } = props;
  const { name, link } = props.card;
  return (
    <div className="popup">
      <div className="popup__container">
        <button
          aria-label="Close popup"
          className="popup__close-button"
          type="button"
          onClick={onClose}
          
        />
        <img src={link} alt={name} className="popup__image" />
    
        <p className="popup__caption">{name}</p>
      </div>
    </div>
  );
}
