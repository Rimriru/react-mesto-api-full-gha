const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": password, 
      "email": email
    }),
  }).then(res => checkResponse(res))
}

export function login(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
  }).then(res => checkResponse(res))
}

export function logout() {
  return fetch(`${baseUrl}/signout`, {
    credentials: "include",
  }).then(res => checkResponse(res));
}

export function checkTokenValidity() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => checkResponse(res))
}
