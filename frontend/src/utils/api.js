class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json().then((data) => data);
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async editUserInfo({ name, about }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
    return this._checkResponse(res);
  }

  async changeUserAvatar(avatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
    return this._checkResponse(res);
  }

  async addNewCard({ name, link }) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
    return this._checkResponse(res);
  }

  async removeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async addLikeCard(cardId) {
    const res = await fetch(
      `${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        credentials: "include",
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async removeLikeCard(cardId) {
    const res = await fetch(
      `${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: "include",
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLikeCard(cardId) : this.addLikeCard(cardId);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
