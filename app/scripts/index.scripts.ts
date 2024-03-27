import { init as InitExpress } from "./loaders/express.loader";
import { init as InitMongoose } from "./loaders/mongoose.loader";
export async function Load() {
  /**
   * Loads and initializes the application.
   * 
   * This function initializes the MongoDB connection using the `InitMongoose` function,
   * and then starts the Express server using the `InitExpress` function.
   * 
   * @example
   * ```typescript
   * Load();
   * ```
   * 
   * @returns {Promise<void>} - A promise that resolves when the loading process is finished.
   */
  console.log("Loading app...");
  try {
    console.log("Loading mongoose...");
    await InitMongoose();
    console.log("ok");
    console.log("Loading express...");
    InitExpress();
    console.log("ok");
  } catch (error) {
    console.error("Error while loading app: \n\n" + error);
    process.exit(1);
  }
  console.log("Finished...");
}
