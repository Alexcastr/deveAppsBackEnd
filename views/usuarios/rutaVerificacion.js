import Express from "express";
import { checkOrCreateUser } from "../../controllers/usuarios/controller.js";
const verificationRoute = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send("Error consultando los vehiculos");
    } else {
      res.json(result);
    }
  };

verificationRoute.route("/usuarios/self").get((req, res) => {
    console.log('alguien hizo get en la ruta /self');
    checkOrCreateUser(req, genericCallback(res));
  });

export default verificationRoute;