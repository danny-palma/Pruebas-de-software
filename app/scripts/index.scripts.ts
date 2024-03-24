import { init as InitExpress } from "./loaders/express.loader";
import { init as InitMongoose } from "./loaders/mongoose.loader";
export async function Load() {
  console.log('Loading app...');
  try {
    console.log('Loading mongoose...');
    await InitMongoose();
    console.log('ok');
    console.log('Loading express...');
    InitExpress();
    console.log('ok');
  } catch (error) {
    console.error('Error while loading app: \n\n' + error);
    process.exit(1);
  }
  console.log('Finished...');
}
