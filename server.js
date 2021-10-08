import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from "cors";

const stringConexion =
  "mongodb+srv://jaimemunozq:admindatabase15@deveappsbd.j2i6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos/registros', (req, res) => {
    console.log('alguien hizo get en la ruta /productos/registros');
    baseDeDatos
      .collection('producto')
      .find()
      .limit(50)
      .toArray((err, result) => {
        if (err) {
          res.status(500).send('Error consultando los vehiculos');
        } else {
          res.json(result);
        }
      });
  });

app.post("/productos/crear", (req, res) => {
  console.log(req);
  const datosProducto = req.body;
  console.log("llaves: ", Object.keys(datosProducto));
  // implementar código para crear vehículo en la BD
  baseDeDatos.collection("producto").insertOne(datosProducto, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});

app.patch('/productos/actualizar', (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
      $set: edicion,
    };
    baseDeDatos
      .collection('producto')
      .findOneAndUpdate(
        filtroProducto,
        operacion,
        { upsert: true, returnOriginal: true },
        (err, result) => {
          if (err) {
            console.error('error actualizando el producto: ', err);
            res.sendStatus(500);
          } else {
            console.log('actualizado con éxito');
            res.sendStatus(200);
          }
        }
      );
  });

  app.delete('/productos/eliminar', (req, res) => {
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    baseDeDatos.collection('producto').deleteOne(filtroProducto, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error conectando a la base de datos");
    }
    baseDeDatos = db.db("productos");
    console.log("conexion a la base De Datos exitosa");
    return app.listen(5000, () => {
      console.log("escuchando puerto 5000");
    });
  });
};

main();
