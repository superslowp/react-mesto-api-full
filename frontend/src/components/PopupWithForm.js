import React from 'react';

const PopupWithForm = ({ title, name, children, isOpened, onClose, buttonText, onSubmit }) => {
    return (
        <div className={`popup ${isOpened ? "popup_opened" : ""}`} id={`popup_${name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" id={`${name}_close_button`} onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form onSubmit={onSubmit} className="popup__form" name={name} >
                    {children}
                    <button type="submit" className="popup__submit-button">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;