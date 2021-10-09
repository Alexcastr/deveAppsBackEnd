import Express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/productos/controller.js";
const routesProducts = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los vehiculos");
  } else {
    res.json(result);
  }
};

routesProducts.route("/productos").get((req, res) => {
  getAllProducts(genericCallback(res));
});

routesProducts.route("/productos").post((req, res) => {
  createProduct(req.body, genericCallback(res));
});

routesProducts.route("/productos/:id").patch((req, res) => {
  updateProduct(req.params.id, req.body, genericCallback(res));
});

routesProducts.route("/productos/:id").delete((req, res) => {
  deleteProduct(req.params.id, genericCallback(res));
});

export default routesProducts;