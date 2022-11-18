import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = `element__trash-button ${isOwn ? '' : 'element__trash-button_hidden'}`;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем    
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

    function handleLikeClick(card) {
        onCardLike(card);
    }

    return (
        <div className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={() => onCardDelete(card)} />
            <img className="element__photo"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick(card)} />
            <div className="element__title-wrapper">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-wrapper">
                    <button onClick={() => handleLikeClick(card)} type="button" className={cardLikeButtonClassName} />
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;