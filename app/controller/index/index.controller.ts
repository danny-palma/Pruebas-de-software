import { Request, Response } from "express";
import path from "path";

export async function controller(req: Request, res: Response) {
  try {
    res.sendFile(path.resolve(__dirname + "../../../../html/index.html"));
  } catch (Error) {
    console.error("Error while getting index.html" + Error)
  }
}
