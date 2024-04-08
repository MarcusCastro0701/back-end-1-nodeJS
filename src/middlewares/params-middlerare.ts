import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


export async function authenticateParams(req: Request, res: Response, next: NextFunction) {

  const id = req.params;

  try {
    
    if(!id){
      res.sendStatus(httpStatus.BAD_REQUEST)
    }

    next();

  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export type AuthenticatedAdminRequest = Request & RequestWithAdminId;

type RequestWithAdminId = {
  adminId: number;
};
