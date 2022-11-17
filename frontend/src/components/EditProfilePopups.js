import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpened]);

    function handleName(evt) {
        setName(evt.target.value);
    }

    function handleDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser(name, description);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpened={isOpened}
            name="edit-button"
            title="Редактировать профиль"
            buttonText={'Сохранить'}
        >
            <fieldset className="popup__fieldset">
                <input
                    type="text"
                    value={name || ''}
                    onChange={handleName}
                    className="popup__input popup__input_type_name"
                    placeholder="Имя"
                    name="name"
                    required
                    minLength="2"
                    maxLength="40"
                    id="username" />
                <span className="popup__error name-error"></span>
                <input
                    value={description || ''}
                    onChange={handleDescription}
                    type="text"
                    className="popup__input popup__input_type_occupation"
                    placeholder="О себе"
                    name="about"
                    required
                    minLength="2"
                    maxLength="200"
                    id="about" />
                <span className="popup__error about-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;