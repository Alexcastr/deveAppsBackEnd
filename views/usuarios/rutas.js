import Express from "express";
import { getAllUsers, updateUser } from "../../controllers/usuarios/controller.js";

const routesUsers = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los vehiculos");
  } else {
    res.json(result);
  }
};

routesUsers.route("/usuarios").get((req, res) => {
  getAllUsers(genericCallback(res));
});

routesUsers.route("/usuarios/:id").patch((req, res) => {
  updateUser(req.params.id, req.body, genericCallback(res));
});

export default routesUsers;
