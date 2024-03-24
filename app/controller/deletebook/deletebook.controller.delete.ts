import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader"
;
import { isValidObjectId } from "mongoose";

// Endpoint para eliminar una película
export async function controller(req: Request, res: Response)  {
  try {
    const BookId = req.query.id;
    if (!BookId || (BookId && !isValidObjectId(BookId))) {
      res.status(400).json({status: 400, message: "Malformed body request"});
      return;
    }
    await BookModel.findByIdAndDelete(BookId);
  
    // Actualizar el tiempo de vida de la clave de caché a 1 hora (3600 segundos)
    CacheClient.flushAll();
  
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({status: 500, message: 'Internal server error'});
    console.error(error);
  }
};
