import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";

/**
 * Handles a POST request to create a new book.
 * 
 * @param req The request object containing the HTTP request information.
 * @param res The response object used to send the HTTP response.
 */
export async function controller(req: Request, res: Response) {
  try {
    const { title, sinopsis, imgurl } = req.body;

    // Check if any of the required fields are missing
    if (!title || !sinopsis || !imgurl) {
      res.status(400).json({ status: 400, message: "Malformed body request" });
      return;
    }

    // Create a new book instance
    const newBook = new BookModel({ title, sinopsis, imgurl });

    // Save the new book to the database
    await newBook.save();

    // Flush the cache
    CacheClient.flushAll();

    // Return the newly created book
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
    console.error(error);
  }
}
