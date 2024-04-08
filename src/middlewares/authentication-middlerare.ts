import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  try {
    return 'ok'

  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export type AuthenticatedRequest = Request & RequestWithUser;

type RequestWithUser = {
  userId: number;
};
