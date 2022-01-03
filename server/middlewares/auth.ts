import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(403).json({ res: 'No token, authorization denied', error: true});
    }
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.user = decoded.user;
      next();
    } catch (err) {
      if (err.name) {
        return res.status(401).send({ res: 'Token expired!', error: true });
      }
      return res.status(401).json({ res: 'Token is not valid', error: true });
    }
}