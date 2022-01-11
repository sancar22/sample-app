import { Request, Response } from "express";
import { User } from "../models/user";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
        where: { id: req.body.user.id },
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    res.status(200).send({res: user, error: false});
  } catch (e) {
    console.log(e);
    res.status(500).send({ res: "Internal Server Error!", error: true });
  }
};

const deleteTestUser = async (req: Request, res: Response) => {
  console.log('here')
  try {
    await User.destroy({
        where: { username: 'testUser' }
    });
    res.status(200).send({res: 'Test user deleted!', error: false});
  } catch (e) {
    console.log(e);
    res.status(500).send({ res: "Internal Server Error!", error: true });
  }
};


export default { getUser, deleteTestUser };
