import { FormData } from '../interfaces';

const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const registerUser = (userData: FormData) => {
  return fetch(baseURL + '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

const loginUser = () => {
  
};


export const authService = {registerUser, loginUser};