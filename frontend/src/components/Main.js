import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ cards, onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main main_visible">
            <section className="profile">
                <div className="profile__wrapper">
                    <div className="profile__avatar-wrapper">
                        <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                        <div className="profile__avatar-overlay" onClick={onEditAvatarClick}></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-wrapper">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={onEditProfileClick}></button>
                        </div>
                        <p className="profile__occupation">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlaceClick}></button>
            </section>
            <section className="elements">
                {
                    cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))
                }
            </section>
        </main>
    )
}

export default Main;