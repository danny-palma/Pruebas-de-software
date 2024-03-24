import express from "express";
import bodyParser from "body-parser";

// Configure Express

export function init() {
  try {
    const port = process.env.DEFAULT_PORT;
    app.use(bodyParser.json());
  
    // Start server
    app.listen(port, () => {
      console.log(`Server listening in port: ${port}`);
    });
  } catch (error) {
    console.error('Error while loading express: \n\n' + error);
    process.exit(1);
  }
}

export const app = express();
