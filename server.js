import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import routesProducts from './views/productos/rutas.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(routesProducts);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};
 connectDB(main);

// app.get('/productos/registros', (req, res) => {
//     console.log('alguien hizo get en la ruta /productos/registros');
//     baseDeDatos
//       .collection('producto')
//       .find()
//       .limit(50)
//       .toArray((err, result) => {
//         if (err) {
//           res.status(500).send('Error consultando los vehiculos');
//         } else {
//           res.json(result);
//         }
//       });
//   });

// app.post("/productos/crear", (req, res) => {
//   console.log(req);
//   const datosProducto = req.body;
//   console.log("llaves: ", Object.keys(datosProducto));
//   // implementar código para crear vehículo en la BD
//   baseDeDatos.collection("producto").insertOne(datosProducto, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       console.log(result);
//       res.sendStatus(200);
//     }
//   });
// });

// app.patch('/productos/actualizar', (req, res) => {
//     const edicion = req.body;
//     console.log(edicion);
//     const filtroProducto = { _id: new ObjectId(edicion.id) };
//     delete edicion.id;
//     const operacion = {
//       $set: edicion,
//     };
//     baseDeDatos
//       .collection('producto')
//       .findOneAndUpdate(
//         filtroProducto,
//         operacion,
//         { upsert: true, returnOriginal: true },
//         (err, result) => {
//           if (err) {
//             console.error('error actualizando el producto: ', err);
//             res.sendStatus(500);
//           } else {
//             console.log('actualizado con éxito');
//             res.sendStatus(200);
//           }
//         }
//       );
//   });

  // app.delete('/productos/eliminar', (req, res) => {
  //   const filtroProducto = { _id: new ObjectId(req.body.id) };
  //   baseDeDatos.collection('producto').deleteOne(filtroProducto, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.sendStatus(500);
  //     } else {
  //       res.sendStatus(200);
  //     }
  //   });
  // });

