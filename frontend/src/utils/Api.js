class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        };
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(this._getResponseData);
    }

    updateUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._getResponseData);
    }

    getInitialCards(renderItems) {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(this._getResponseData);
    }

    submitCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._getResponseData);
    }

    deleteCard({ _id }) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._getResponseData);
    }

    setLike(cardId, isLiked) {
        const method = isLiked ? "PUT" : "DELETE";

        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: method,
            headers: this._headers
        })
            .then(this._getResponseData);
    }



    submitAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._getResponseData);
    }
}

const apiToken = "30915f24-f46c-4f5a-b85c-bd1af9f1e51a";
const apiBaseUrl = "https://mesto.nomoreparties.co/v1/cohort-47";

const api = new Api({
    baseUrl: apiBaseUrl,
    headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
    }
});

export default api;