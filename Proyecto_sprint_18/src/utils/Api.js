class Api {
  constructor(url) {
    this.url = url;
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })

      .catch((err) => console.error(err));
  }

  createDescription({ name, about }) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => console.error(err));
  }

  loadCard() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/cards/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })

      .catch((err) => console.error(err));
  }
  likeCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  unlikeCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem("jwt");
    if (isLiked) {
      return this.likeCard(cardId);
    }

    return this.unlikeCard(cardId);
  }

  createCard(name, link) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  deleteCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
  updateUserInfo(avatarUrl) {
    const token = localStorage.getItem("jwt");
    console.log("enviando al servidor:", JSON.stringify({ avatar: avatarUrl }));
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}

export const api = new Api("https://api.wtwrr.chickenkiller.com");
