import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";
import { isValidObjectId } from "mongoose";

/**
 * Handles an HTTP request to retrieve books based on search parameters.
 *
 * @param req - The HTTP request object containing the query parameters.
 * @param res - The HTTP response object used to send the response.
 * @returns The search results as a JSON array in the response body.
 * @throws 400 Bad Request if the request is malformed.
 * @throws 500 Internal Server Error if there is an internal server error.
 *
 * @example
 * // Request:
 * // GET /books?title=Harry%20Potter&sinopsis=magic
 *
 * // Response:
 * // Status: 200 OK
 * // Body: [
 * //   {
 * //     "_id": "60a4e3e3c9e77a001f3e8e1a",
 * //     "title": "Harry Potter and the Sorcerer's Stone",
 * //     "sinopsis": "A young boy discovers he is a wizard and attends a magical school.",
 * //     "imgurl": "https://example.com/harry_potter.jpg"
 * //   },
 * //   {
 * //     "_id": "60a4e3e3c9e77a001f3e8e1b",
 * //     "title": "Harry Potter and the Chamber of Secrets",
 * //     "sinopsis": "Harry uncovers a chamber containing a deadly monster.",
 * //     "imgurl": "https://example.com/harry_potter2.jpg"
 * //   }
 * // ]
 */
export async function controller(req: Request, res: Response) {
  try {
    let { title, sinopsis, _id, imgurl } = req.query;
    if (!_id && !sinopsis && !title && !imgurl) {
      res
        .status(400)
        .json({ status: 400, message: "Missing search parameters" });
      return;
    }
    if (_id && !isValidObjectId(_id)) {
      res.status(400).json({ status: 400, message: "Invalid provided id" });
      return;
    }
    if ((title?.length as number) >= 255) {
      res
        .status(400)
        .json({
          status: 400,
          message: "The parameter title exceeds the limit 255 characters",
        });
      return;
    }
    if ((sinopsis?.length as number) >= 255) {
      res.status(400).json({
        status: 400,
        message: "The parameter sinopsis exceeds the limit 255 characters",
      });
      return;
    }
    if ((imgurl?.length as number) >= 255) {
      res.status(400).json({
        status: 400,
        message: "The parameter imgurl exceeds the limit 255 characters",
      });
      return;
    }
    if ((_id?.length as number) >= 255) {
      res.status(400).json({
        status: 400,
        message: "The parameter _id exceeds the limit 255 characters",
      });
      return;
    }
    // Limit the length of the search parameters
    title = typeof title === "string" ? title.substring(0, 255) : "";
    sinopsis = typeof sinopsis === "string" ? sinopsis.substring(0, 255) : "";
    _id = typeof _id === "string" ? _id.substring(0, 255) : "";
    imgurl = typeof imgurl === "string" ? imgurl.substring(0, 255) : "";

    // Normalize and sort the search parameters
    const normalizedParams = [title, sinopsis, _id, imgurl]
      .map((param) => param?.trim().toLowerCase())
      .filter((param) => param)
      .sort();

    const cacheKey = `Books_${normalizedParams.join("_")}`;

    // Check if the search results are cached
    const cachedData = CacheClient.get<string>(cacheKey);
    if (cachedData) {
      // If the data is cached, use it directly
      console.log("Getting books from cache...");
      const Books = JSON.parse(cachedData);
      res.json(Books);
    } else {
      // If the data is not cached, retrieve it from MongoDB
      console.log("Getting books from MongoDB database...");

      // Construct the query object based on the provided search parameters
      const query: any = {};
      if (title) {
        query.title = new RegExp(title.toString(), "i");
      }
      if (sinopsis) {
        query.sinopsis = new RegExp(sinopsis.toString(), "i");
      }
      if (imgurl) {
        query.imgurl = new RegExp(imgurl.toString(), "i");
      }
      if (_id) {
        query._id = _id;
      }

      // Perform the query on the MongoDB database
      const Books = await BookModel.find(query);

      // Cache the results with a TTL of 1 hour (3600 seconds)
      CacheClient.set(cacheKey, JSON.stringify(Books));

      res.json(Books);
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
    console.error(error);
  }
}
