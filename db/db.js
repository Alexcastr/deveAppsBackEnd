import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dataBase;

const connectDB = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error conectando a la base de datos");
      return "error";
    }
    dataBase = db.db("Gestionapp");
    console.log("conexión exitosa");
    return callback();
  });
};

const getDB = () => {
  return dataBase;
};

export { connectDB, getDB };
