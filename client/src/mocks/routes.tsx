import { rest } from 'msw';

import {FormDataRegister} from '../interfaces';

const base_api_url = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const routes = [

  rest.get(base_api_url + '/api/user', (req, res, ctx) => {}),


  /*
  ---------------- START AUTH ROUTES -------------------------
  */
 rest.post(base_api_url + '/api/auth/login', (req, res, ctx) => {
  sessionStorage.setItem('accessToken', 'success');
  return res(ctx.status(200), ctx.json({ res: 'success' }));
 }),
  rest.post<FormDataRegister>(base_api_url + '/api/auth/register', (req, res, ctx) => {
    const { firstName, surname, username, password } = req.body;
    if (!firstName || !surname || !username || !password) {
      return res(ctx.status(400), ctx.json({res: 'Missing fields!', error: true}))
    } else {
      return res(ctx.status(201), ctx.json({res: 'User registered successfully!', error: false}))
    }
  }),
  /*
  ---------------- END AUTH ROUTES -------------------------
  */

  /*
  ---------------- START USER ROUTES -------------------------
  */
  rest.get(base_api_url + '/api/user/getInfo', (req, res, ctx) => {}),
  /*
  ---------------- END USER ROUTES -------------------------
  */


  /*
  ---------------- START MESSAGE ROUTES -------------------------
  */
  rest.post(base_api_url + '/api/message', (req, res, ctx) => {}),
  rest.get(base_api_url + '/api/message/getAll', (req, res, ctx) => {}),
  /*
  ---------------- END MESSAGE ROUTES -------------------------
  */
 
];