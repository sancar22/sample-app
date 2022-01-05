import { DefaultRequestBody, ResponseComposition, rest, RestContext } from 'msw';

import {FormDataRegister, IUser} from '../interfaces';

const base_api_url = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const testUser = {
  id: 1,
  firstName: "Rick",
  surname: "Sanchez",
  username: "pickelrick"
}

interface PostMessageRequest {
  user: IUser;
  message: string;
}


const isNotAuthenticated = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
  return res(
    ctx.status(403),
    ctx.json({
      errorMessage: 'Not authorized',
    })
  );
}

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
  rest.get(base_api_url + '/api/user/getInfo', (req, res, ctx) => {
    const isAuthenticated = !!sessionStorage.getItem('accessToken');
    if (isAuthenticated) {
      return res(
        ctx.status(200),
        ctx.json({res: {id: 1, firstName: "Rick", surname: "Sanchez", username: "pickelrick", messages: []}, error: false})
      )
    } else {
      return isNotAuthenticated(res, ctx);
    }
  }),
  /*
  ---------------- END USER ROUTES -------------------------
  */


  /*
  ---------------- START MESSAGE ROUTES -------------------------
  */
  rest.get(base_api_url + '/api/message/getAll', (req, res, ctx) => {
    const isAuthenticated = !!sessionStorage.getItem('accessToken')
    if (isAuthenticated) {
      return res(
        ctx.status(200),
        ctx.json({
          res: [
            { id: 1, ownerId: 1, text: "Test 1", user: testUser },
            { id: 2, ownerId: 1, text: "Test 2", user: testUser }
          ],
          error: false
        })
      )
    } else {
      return isNotAuthenticated(res, ctx);
    }
  }),

  rest.post<PostMessageRequest>(base_api_url + '/api/message', (req, res, ctx) => {
    const isAuthenticated = !!sessionStorage.getItem('accessToken')
    if (isAuthenticated) {
      try {
        const {message, user} = req.body;
        if (message.trim().length === 0) {
          return res(ctx.status(400), ctx.json({res: "Message should be at least 1 character long", error: true}))
        } else {
          return res(
            ctx.status(201),
            ctx.json({
              res: {
                ownerId: user.id,
                text: message
              },
              error: false
            })
          )
        }
      } catch(e){
        return res(
          ctx.status(500),
          ctx.json({
            res: "Internal Server Error!",
            error: true
          })
        )
      }
    } else {
      return isNotAuthenticated(res, ctx);
    }
  }),
  /*
  ---------------- END MESSAGE ROUTES -------------------------
  */
];