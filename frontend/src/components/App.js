import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopups';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import * as auth from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Register from './Register'
import Login from './Login'

import InfoToolTip from './InfoTooltip'

function App() {

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTootipOpen, setisInfoTootipOpen] = React.useState(false);
  const [infoText, setinfoText] = React.useState('');
  const [isInfoToolTipSuccess, setisInfoToolTipSuccess] = React.useState(false);

  // проверим токен
  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id);

    api.setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.submitAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(name, about) {
    api.updateUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(card, link) {
    api.submitCard(card, link)
      .then((newCards) => {
        setCards([newCards, ...cards]);
        console.log(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleCardClick(card) {
    setCurrentCard(card);
    setIsImagePopupOpen(true);
  }

  function openInfoToolTip(success) {
    setinfoText(success === true ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз");
    setisInfoToolTipSuccess(success);
    setisInfoTootipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setCurrentCard({});
    setisInfoTootipOpen(false);
  }

  function handleLogout() {
    auth.logout().then(() => {
      setEmail('')
      setIsLoggedIn(false)
      navigate('/')
    })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res.data._id || res.data.email) {
          navigate("/");
          openInfoToolTip(true);
        }
      })
      .catch(err => {
        openInfoToolTip(false);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then(res => {
        if (res.id) {
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoggedIn(false);
        openInfoToolTip(false);
      })
  }

  function tokenCheck() {
    auth.getContent()
      .then((res) => {
        if (res) {
          setEmail(res.email);
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            email={email}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route path='/' element={<ProtectedRoute
              isLoggedIn={isLoggedIn}
              Component={Main}
              cards={cards}
              onEditAvatarClick={handleEditAvatarClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditProfileClick={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />}
            />
            <Route path="/sign-in" element={<Login
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
            />}
            />
            <Route path="/sign-up" element={<Register
              isLoggedIn={isLoggedIn}
              handleRegister={handleRegister}
            />}
            />
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
          </Routes>
          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpened={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onAvatarUpdate={handleUpdateAvatar}
          />

          <ImagePopup
            card={currentCard}
            isOpened={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoToolTip
            popupText={infoText}
            isOpen={isInfoTootipOpen}
            onClose={closeAllPopups}
            success={isInfoToolTipSuccess}
          />

        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
