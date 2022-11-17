import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpened, onClose, onAddPlace }) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    React.useEffect(() => {
        if (isOpened) {
            setCardName('');
            setCardLink('');
        }
    }, [isOpened])

    function handleCardName(evt) {
        setCardName(evt.target.value);
    }

    function handleCardLink(evt) {
        setCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(cardName, cardLink);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpened={isOpened}
            name="card-submit"
            title="Новое место"
            buttonText={"Добавить"}
        >
            <fieldset className="popup__fieldset">
                <input
                    value={cardName}
                    onChange={handleCardName}
                    type="text"
                    className="popup__input popup__input_type_name"
                    placeholder="Название"
                    name="name"
                    minLength="2"
                    maxLength="30"
                    required
                    id="name" />
                <span className="popup__error name-error"></span>
                <input
                    value={cardLink}
                    onChange={handleCardLink}
                    type="url"
                    className="popup__input popup__input_type_link"
                    placeholder="Ссылка на картинку"
                    name="link"
                    required
                    id="link" />
                <span className="popup__error link-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;