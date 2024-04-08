import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


export async function authenticateBody(req: Request, res: Response, next: NextFunction) {

  const body = req.body;

  try {
    
    if(!body){
      res.sendStatus(httpStatus.BAD_REQUEST)
    }

    return next()

  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export type AuthenticatedRequest = Request & RequestWithUser;

type RequestWithUser = {
  userId: number;
};
