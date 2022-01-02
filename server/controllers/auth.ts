import { Request, Response } from "express";
import {Message} from '../models/message';

const login = async (req: Request, res: Response) => {
  try {
    res.status(200).send("Logged In!");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
};

const register = async (req: Request, res: Response) => {
  try {
      
    console.log(req.body, 'body here')
    res.status(201).send({res: 'User registered successfully!', error: false});
  } catch (e) {
    console.log(e);
    res.status(500).send({res: e, error: true});
  }
};

export default { login, register };
