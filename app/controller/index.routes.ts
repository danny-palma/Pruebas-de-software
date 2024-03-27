import { app } from "../scripts/loaders/express.loader";
import { controller as ControllerDeleteBook } from "./deletebook/deletebook.controller.delete";
import { controller as ControllerNewBook } from "./newbook/newbook.controller.post";
import { controller as ControllerSearchBook } from "./searchbook/searchbook.controller.get";
import { controller as ControllerPutBook } from "./updatebook/putbook.controller.put";

export function init() {
  /**
   * Sets up the routes for the different HTTP methods (DELETE, POST, GET, PUT) in the Express application.
   * Associates each route with its corresponding controller function.
   * 
   * @example
   * ```typescript
   * import { init } from "./init";
   * 
   * init();
   * ```
   * 
   * @returns {void}
   */
  try {
    console.log("Loading controllers...");
    app.delete("/deleteBook", ControllerDeleteBook);
    app.post("/newBook", ControllerNewBook);
    app.get("/searchBook", ControllerSearchBook);
    app.put("/updateBook", ControllerPutBook);
    console.log("Finished...");
  } catch (error) {
    console.error("Error while loading controllers: \n\n" + error);
    process.exit(1);
  }
}
