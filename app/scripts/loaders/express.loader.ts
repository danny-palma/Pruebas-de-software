import express from "express";
import bodyParser from "body-parser";

export function init() {
  /**
   * Initializes the Express server by configuring it with middleware and starting it on a specified port.
   * @returns {void}
   * @throws {Error} If there is an error while loading Express.
   */
  try {
    const port = process.env.DEFAULT_PORT || process.env.PORT;
    app.use(bodyParser.json());

    // Start server
    app.listen(port, () => {
      console.log(`Server listening in port: ${port}`);
    });
  } catch (error) {
    console.error("Error while loading express: \n\n" + error);
    process.exit(1);
  }
}

export const app = express();
