import {
  DefaultRequestBody,
  ResponseComposition,
  rest,
  RestContext,
} from 'msw';

import { FormDataRegister, IUser, FormDataLogin } from '../interfaces';

const base_api_url = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const testUser = {
  id: 1,
  firstName: 'Rick',
  surname: 'Sanchez',
  username: 'pickelrick',
  password: 'strongpassword',
  jwtToken: 'randomToken',
};

export const testUserSecondary = {
  id: 2,
  firstName: 'Santiago',
  surname: 'Vásquez',
  username: 'sancar100',
  password: 'helloworld',
  jwtToken: 'randomTokenAgain',
};

export const mockMessages = [
  {
    id: 1,
    User: {
      firstName: testUser.firstName,
      surname: testUser.surname,
      username: testUser.username,
    },
    ownerId: testUser.id,
    createdAt: '2022-01-03T16:18:44.648Z',
    text: 'Hello Santiago!',
  },
  {
    id: 2,
    User: {
      firstName: testUser.firstName,
      surname: testUser.surname,
      username: testUser.username,
    },
    ownerId: testUser.id,
    createdAt: '2022-01-03T17:18:44.648Z',
    text: 'It is me again!',
  },
  {
    id: 3,
    User: {
      firstName: testUserSecondary.firstName,
      surname: testUserSecondary.surname,
      username: testUserSecondary.username,
    },
    ownerId: testUserSecondary.id,
    createdAt: '2022-01-03T17:19:44.648Z',
    text: 'Hello Rick!',
  },
];

interface PostMessageRequest {
    user: IUser;
    message: string;
}

const isNotAuthenticated = (
  res: ResponseComposition<DefaultRequestBody>,
  ctx: RestContext
) => {
  return res(
    ctx.status(403),
    ctx.json({
      res: 'Not authorized!',
      error: true,
    })
  );
};

export const routes = [
  /*
  ---------------- START AUTH ROUTES -------------------------
  */
  rest.post<FormDataLogin>(
    base_api_url + '/api/auth/login',
    (req, res, ctx) => {
      const { username, password } = req.body;
      if (!username || !password)
        return res(
          ctx.status(400),
          ctx.json({ res: 'Missing fields!', error: true })
        );
      if (
        username !== testUser.username ||
                password !== testUser.password
      ) {
        return res(
          ctx.status(401),
          ctx.json({
            res: 'Invalid username or password!',
            error: true,
          })
        );
      }
      if (
        username === testUser.username &&
                password === testUser.password
      ) {
        return res(
          ctx.status(200),
          ctx.json({ res: testUser.jwtToken, error: false })
        );
      } else {
        return res(
          ctx.status(200),
          ctx.json({ res: 'fail', error: true })
        );
      }
    }
  ),
  rest.post<FormDataRegister>(
    base_api_url + '/api/auth/register',
    (req, res, ctx) => {
      const { firstName, surname, username, password } = req.body;
      if (!firstName || !surname || !username || !password) {
        return res(
          ctx.status(400),
          ctx.json({ res: 'Missing fields!', error: true })
        );
      }
      if (password.length < 6) {
        return res(
          ctx.status(400),
          ctx.json({
            res: 'Password must be at least 6 characters long!',
            error: true,
          })
        );
      }
      if (username === testUser.username) {
        return res(
          ctx.status(400),
          ctx.json({ res: 'Username already taken!', error: true })
        );
      }
      return res(
        ctx.status(201),
        ctx.json({ res: 'User registered successfully!', error: false })
      );
    }
  ),
  /*
  ---------------- END AUTH ROUTES -------------------------
  */

  /*
  ---------------- START USER ROUTES -------------------------
  */
  rest.get(base_api_url + '/api/user/getInfo', (req, res, ctx) => {
    const headers = req.headers.all();
    const authHeader = headers.authorization;
    const token = authHeader.split(' ')[1];
    if (token !== testUser.jwtToken) return isNotAuthenticated(res, ctx);
    const { id, firstName, surname, username } = testUser;
    return res(
      ctx.status(201),
      ctx.json({
        res: { id, firstName, surname, username },
        error: false,
      })
    );
  }),
  /*
  ---------------- END USER ROUTES -------------------------
  */

  /*
  ---------------- START MESSAGE ROUTES -------------------------
  */
  rest.get(base_api_url + '/api/message/getAll', (req, res, ctx) => {
    const headers = req.headers.all();
    const authHeader = headers.authorization;
    const token = authHeader.split(' ')[1];
    if (token !== testUser.jwtToken) return isNotAuthenticated(res, ctx);
    return res(
      ctx.status(200),
      ctx.json({ res: mockMessages, error: false })
    );
  }),

  rest.post<PostMessageRequest>(
    base_api_url + '/api/message/',
    (req, res, ctx) => {
      const headers = req.headers.all();
      const authHeader = headers.authorization;
      const token = authHeader.split(' ')[1];
      if (token !== testUser.jwtToken)
        return isNotAuthenticated(res, ctx);
      const { message } = req.body;
      if (message.trim().length === 0)
        return res(
          ctx.status(400),
          ctx.json({
            res: 'Message should be at least 1 character long',
            error: true,
          })
        );
      const newMessage = {
        id: 4,
        User: {
          firstName: testUser.firstName,
          surname: testUser.surname,
          username: testUser.username,
        },
        ownerId: testUser.id,
        createdAt: '2022-01-03T20:04:44.648Z',
        text: message,
      };
      return res(ctx.status(201), ctx.json({res: newMessage, error: false}));
    }
  ),
  /*
  ---------------- END MESSAGE ROUTES -------------------------
  */
];
