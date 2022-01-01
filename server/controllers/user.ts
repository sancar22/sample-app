import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  try {
    console.log('entered')
    res.status(200).send([{user: 'santiago', lastName: 'Vásquez'}]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log("entered");
    res.status(204).send(`User with id ${req.params.id} deleted!`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
};

export default { getUser, deleteUser };
