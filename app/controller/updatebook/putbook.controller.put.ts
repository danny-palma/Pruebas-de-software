import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";
import { isValidObjectId } from "mongoose";

// Endpoint para actualizar una película
export async function controller (req: Request, res: Response) {
  try {
    const BookId = req.query.id;
    const { title, sinopsis, imgurl } = req.body;
    if (!BookId || !isValidObjectId(BookId) || !title || !sinopsis || !imgurl){
      res.status(400).json({status: 400, message: "Malformed body request"});
      return;
    }
    
    const updatedBook = await BookModel.findByIdAndUpdate(
      BookId,
      { title, sinopsis, imgurl },
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).json({status: 404, message: 'Not found'});
      return;
    }
    CacheClient.flushAll();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({status: 500, message: 'Internal server error'});
    console.error(error);
  }
};
