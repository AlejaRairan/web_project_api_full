import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import { api } from "../utils/Api.js";
import * as auth from "../utils/auth.js";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn/RedirectIfLoggedIn.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          setLoggedIn(true);
          setUserEmail(userData.email);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  useEffect(() => {
    api
      .loadCard()
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCardLike = async (card) => {
    const isLiked = card.likes.includes(currentUser._id);
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = async (cardId) => {
    await api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
      })
      .catch((err) => console.error(err));
  };

  const handleAddPlaceSubmit = (name, link) => {
    api
      .createCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateUser = (data) => {
    api
      .createDescription(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateUserInfo(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = (email, password) => {
    if (!email || !password) {
      console.error("Faltan email o password");
      return;
    }
    auth
      .register(email, password)
      .then(() => {
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      console.error("Faltan email o password");
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  };

  const handleCloseInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
    if (isRegisterSuccess) {
      navigate("/signin");
    }
  };
  if (isCheckingToken) {
    return <p className="page__loading">Cargando...</p>;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        loggedIn,
        userEmail,
        handleLogout,
      }}
    >
      <div className="page">
        <Header
          isLoggedIn={loggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
        <div className="page__content">
          <Routes>
            <Route
              path="/signin"
              element={
                <RedirectIfLoggedIn isLoggedIn={loggedIn}>
                  <Login onLogin={handleLogin} />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectIfLoggedIn isLoggedIn={loggedIn}>
                  <Register onRegister={handleRegister} />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={loggedIn}>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseInfoTooltip}
          isSuccess={isRegisterSuccess}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
