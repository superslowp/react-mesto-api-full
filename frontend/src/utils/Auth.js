import { BASE_URL } from "./constants";

const request = ({ url, method, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    console.log(res);    
    if (res.ok) {      
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

export const register = (email, password) => {
  return request({
    method: 'POST',
    url: '/signup',
    data: { password, email },
  });
};

export const login = (email, password) => {
  return request({
    method: 'POST',
    url: '/signin',
    data: { email, password },
  });
};

export const getContent = () => {
  return request({
    url: '/users/me',
    method: 'GET',
  });
};

