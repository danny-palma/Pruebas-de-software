import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";
import { isValidObjectId } from "mongoose";

// Endpoint para actualizar un libro
/**
 * Handles an endpoint for updating a book.
 * @param req - The request object containing the book ID in the query parameters and the updated book details in the body.
 * @param res - The response object used to send the response back to the client.
 * @returns If the request is valid and the book is found, the function returns the updated book as a JSON response. If the request is invalid (missing or invalid fields) or the book is not found, the function sends an appropriate error response.
 */
export async function controller(req: Request, res: Response) {
  try {
    const BookId = req.query.id;
    const { title, sinopsis, imgurl } = req.body;
    if (!BookId || !isValidObjectId(BookId) || !title || !sinopsis || !imgurl) {
      res.status(400).json({ status: 400, message: "Malformed body request" });
      return;
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      BookId,
      { title, sinopsis, imgurl },
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).json({ status: 404, message: "Not found" });
      return;
    }
    CacheClient.flushAll();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
    console.error(error);
  }
}
