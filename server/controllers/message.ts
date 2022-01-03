import { Request, Response } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";

const getAllMessages = async (_: Request, res: Response) => {
  try {
    const allMessages = await Message.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "surname", "username"],
        },
      ],
    });
    res.status(200).send({ res: allMessages, error: false });
  } catch (e) {
    console.log(e);
    res.status(500).send({ res: "Internal Server Error!", error: true });
  }
};

const postMessage = async (req: Request, res: Response) => {
  try {
    const { message, user } = req.body;
    const newMessage = await Message.create({
      ownerId: user.id,
      text: message,
    });
    return res.status(201).send({ res: newMessage, error: false });
  } catch (e) {
    console.log(e);
    res.status(500).send({ res: "Internal Server Error!", error: true });
  }
};

export default { getAllMessages, postMessage };
