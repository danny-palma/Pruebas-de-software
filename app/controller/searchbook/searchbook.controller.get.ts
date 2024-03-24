import { Request, Response } from "express";
import { BookModel } from "../../scripts/loaders/mongoose.loader";
import { CacheClient } from "../../scripts/loaders/nodecache.loader";
import { isValidObjectId } from "mongoose";

// Endpoint para obtener películas con opción de búsqueda por título, sinopsis o ID
export async function controller(req: Request, res: Response) {
  try {
    let { title, sinopsis, _id, imgurl } = req.query;
    if (!_id && !sinopsis && !title && !imgurl){
      res.status(400).json({ status: 400, message: "Malformed body request" });
      return;
    }
    if (_id && !isValidObjectId(_id)) {
      res.status(400).json({ status: 400, message: "Malformed body request" });
      return;
    }
    // Limitar la longitud de los parámetros de búsqueda
    title = typeof title === "string" ? title.substring(0, 255) : "";
    sinopsis = typeof sinopsis === "string" ? sinopsis.substring(0, 255) : "";
    _id = typeof _id === "string" ? _id.substring(0, 255) : "";
    imgurl = typeof imgurl === "string" ? imgurl.substring(0, 255) : "";
    

    // Normalizar y ordenar alfabéticamente los parámetros de búsqueda
    const normalizedParams = [title, sinopsis, _id, imgurl]
      .map((param) => param?.trim().toLowerCase())
      .filter((param) => param)
      .sort();

    const cacheKey = `Books_${normalizedParams.join("_")}`;

    // Verificar si los resultados están en la caché
    const cachedData = CacheClient.get<string>(cacheKey);
    if (cachedData) {
      // Si los datos están en la caché, usarlos directamente
      console.log("Obteniendo libros desde la caché...");
      const Books = JSON.parse(cachedData);
      res.json(Books);
    } else {
      // Si los datos no están en la caché, obtenerlos de MongoDB
      console.log("Obteniendo libros desde la base de datos MongoDB...");

      // Construir el objeto de consulta en función de los parámetros de búsqueda proporcionados
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

      // Realizar la consulta a la base de datos MongoDB
      const Books = await BookModel.find(query);

      // Guardar los resultados en la caché con un tiempo de vida de 1 hora (3600 segundos)
      CacheClient.set(cacheKey, JSON.stringify(Books));

      res.json(Books);
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
    console.error(error);
  }
}
