import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import routesProducts from './views/productos/rutas.js';
import routesUsers from './views/usuarios/rutas.js';
import routesSales from './views/ventas/rutas.js'

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(routesProducts);
app.use(routesUsers);
app.use(routesSales);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};
 connectDB(main);

