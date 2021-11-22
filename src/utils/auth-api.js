const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err);
  });
};
export const login = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(getResponse)
  .then((data) => {
    localStorage.setItem('jwt', data.token)
    return data;
  })
  .catch((err) => {
    console.log(err);
  });
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err);
  });
}