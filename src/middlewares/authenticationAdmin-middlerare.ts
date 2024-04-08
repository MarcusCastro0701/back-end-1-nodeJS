import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


export async function authenticateAdminToken(req: AuthenticatedAdminRequest, res: Response, next: NextFunction) {


  try {
    return 'ok'

  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export type AuthenticatedAdminRequest = Request & RequestWithAdminId;

type RequestWithAdminId = {
  adminId: number;
};
