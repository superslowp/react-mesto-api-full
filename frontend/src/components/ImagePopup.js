import React from 'react';

const ImagePopup = ({ onClose, card, isOpened }) => {
    return (
        <div className={`popup popup_img-preview ${isOpened ? 'popup_opened' : null}`}>
            <div className="popup__preview-container">
                <button type="button" className="popup__close-button" id="button_close_image" onClick={onClose}></button>
                <img className="popup__preview-image" src={card.link} alt={card.name} />
                <p className="popup__preview-title">{card.name}</p>
            </div>
        </div>
    );
};

export default ImagePopup;