import React from 'react';
import ok from '../images/success.png';
import fail from '../images/fail.png';

function InfoTooltip({ popupText, success, isOpen, onClose, }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose} />
                <div className="popup__content">
                    <img
                        className="popup__status-image"
                        src={success ? ok : fail}
                        alt="Статус операции"
                    />
                    <h2 className="popup__status-text">{popupText}</h2>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;