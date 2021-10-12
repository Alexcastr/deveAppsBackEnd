import Express from "express";
import {
  deleteSale,
  getAllSales,
  createSale,
  updateSale,
} from "../../controllers/ventas/controller.js";

const routesSales = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando");
  } else {
    res.json(result);
  }
};

routesSales.route("/ventas").get((req, res) => {
  getAllSales(genericCallback(res));
});

routesSales.route("/ventas").post((req, res) => {
  createSale(req.body, genericCallback(res));
});

routesSales.route("/ventas/:id").patch((req, res) => {
  updateSale(req.params.id, req.body, genericCallback(res));
});

routesSales.route("/ventas/:id").delete((req, res) => {
  deleteSale(req.params.id, genericCallback(res));
});

export default routesSales;
