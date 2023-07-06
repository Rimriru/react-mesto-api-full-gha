import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from './Footer.js';
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import PageNotFound from "./PageNotFound.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isQuerySuccessful, setIsQuerySuccessful] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardIdForDelete, setCardIdForDelete] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  const checkToken = () => {
    auth.checkTokenValidity().then((data) => {
    if (data) {
      setIsLoggedIn(true);
      setCurrentUserEmail(data.email);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
  }).catch((err) => {
    setIsLoggedIn(false);
    console.log(err);
  });
  };

  const handleLoginSubmit = (password, email) => {
    auth
      .login(password, email)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUserEmail(email);
        navigate("/", { replace: false });
      })
      .catch((err) => {
        console.log(err);
        setIsQuerySuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

    const handleRegisterSubmit = (password, email) => {
    auth
      .register(password, email)
      .then(() => {
        setIsQuerySuccessful(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsQuerySuccessful(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  };

  const handleSignOut = () => {
    auth
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate("/sign-in", { replace: true });
      })
      .catch(console.error);
  };

  const handlerEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handlerEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handlerAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  const handleCardRemove = (cardId) => {
    setIsConfirmPopupOpen(true);
    setCardIdForDelete(cardId);
  };

  const handleCardDeleteConfirmation = () => {
    api
      .removeCard(cardIdForDelete)
      .then(() => {
        setCards(state => state.filter(card => card._id !== cardIdForDelete));
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .changeUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then(newCard => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
        userEmail={currentUserEmail}
      />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <ProtectedRouteElement
                element={Main}
                loggedIn={isLoggedIn}
                onEditAvatar={handlerEditAvatarClick}
                onEditProfile={handlerEditProfileClick}
                onAddPlace={handlerAddPlaceClick}
                onCardClick={handleCardClick}
                onLikeClick={handleCardLike}
                onRemoveClick={handleCardRemove}
                cards={cards}
                setCards={setCards}
              />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/sign-up"
          element={<Register onSubmit={handleRegisterSubmit} />}
        />
        <Route
          path="/sign-in"
          element={<Login onSubmit={handleLoginSubmit} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleCardDeleteConfirmation}
        cardId={cardIdForDelete}
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccessful={isQuerySuccessful}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
