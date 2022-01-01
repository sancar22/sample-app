import { Request, Response } from "express";

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
    res.status(201).send("Registered!");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
};

export default { login, register };
