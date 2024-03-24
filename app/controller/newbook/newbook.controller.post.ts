import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";

// Endpoint para crear una nueva película
export async function controller (req: Request, res: Response)  {
  try {
    const {title, sinopsis, imgurl } = req.body;
    if (!title || !sinopsis || !imgurl) {
      res.status(400).json({status: 400, message: "Malformed body request"});
      return;
    }
    const newBook = new BookModel({ title, sinopsis, imgurl });
    await newBook.save();
  
    CacheClient.flushAll();
  
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({status: 500, message: 'Internal server error'});
    console.error(error);
  }
};
