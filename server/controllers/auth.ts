import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

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
        const { firstName, surname, username, password } = req.body;
        if (!firstName || !surname || !username || !password)
            return res
                .status(400)
                .send({ res: "Missing fields!", error: true });
        if (password.length < 6)
            return res
                .status(400)
                .send({
                    res: "Password must be at least 6 characters long!",
                    error: true,
                });
        const user = await User.findOne({
          where: {
            username
          }
        });
        if (user) return res.status(409).send({res: "Username already taken!", error: true});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({...req.body, password: hashedPassword});
        res.status(201).send({
            res: "User registered successfully!",
            error: false,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ res: "Internal Server Error!", error: true });
    }
};

export default { login, register };
