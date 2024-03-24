import { Load as LoadApp } from "./scripts/index.scripts";
import { init as InitControllers } from "./controller/index.routes";

try {
    require('dotenv').config();
    LoadApp().then(InitControllers);
} catch (error) {
    console.error('Error mientras se cargaba la aplicacion: \n\n' + error);
}