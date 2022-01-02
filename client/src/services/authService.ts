import { FormDataRegister, FormDataLogin } from '../interfaces';

const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const registerUser = (userData: FormDataRegister) => {
  return fetch(baseURL + '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

const loginUser = (userData: FormDataLogin) => {
  return fetch(baseURL + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};


export const authService = {registerUser, loginUser};