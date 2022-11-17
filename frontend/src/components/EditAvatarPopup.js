import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpened, onClose, onAvatarUpdate }) {

    const currentLink = React.useRef();

    React.useEffect(() => {
        if (isOpened) {
            currentLink.current.value = '';
        }
    }, [isOpened])

    function handleSubmit(evt) {
        evt.preventDefault();
        onAvatarUpdate(currentLink.current.value);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpened={isOpened}
            name="avatar-edit"
            title="Обновить аватар"
            buttonText='Сохранить'
        >
            <fieldset className="popup__fieldset">
                <input
                    ref={currentLink}
                    type="url"
                    className="popup__input popup__input_type_avatar"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    required id="avatar"
                />
                <span className="popup__error avatar-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;