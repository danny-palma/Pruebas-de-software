import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";
import { isValidObjectId } from "mongoose";

/**
 * Handles a request to delete a book.
 * @param req The request object containing the book ID in the query parameter.
 * @param res The response object used to send the HTTP response.
 */
export async function controller(req: Request, res: Response) {
  try {
    const bookId = req.query.id;

    if (!bookId || !isValidObjectId(bookId)) {
      res.status(400).json({ status: 400, message: "Malformed body request" });
      return;
    }

    await BookModel.findByIdAndDelete(bookId);

    // Flush all the cache keys to update the cache.
    CacheClient.flushAll();

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
    console.error(error);
  }
}
