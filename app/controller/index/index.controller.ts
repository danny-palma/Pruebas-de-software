import { Request, Response } from "express";

export async function controller(req: Request, res: Response) {
  try {
    res.sendFile('../../../html/index.html');
  } catch (Error) {
    console.error("Error while getting index.html" + Error)
  }
}
