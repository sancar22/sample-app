import { rest } from 'msw';

const base_api_url = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const routes = [

  rest.get(base_api_url + '/api/user', (req, res, ctx) => {}),


  /*
  ---------------- START AUTH ROUTES -------------------------
  */
  rest.post(base_api_url + '/api/auth/register', (req, res, ctx) => {}),
  rest.post(base_api_url + '/api/auth/login', (req, res, ctx) => {}),
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