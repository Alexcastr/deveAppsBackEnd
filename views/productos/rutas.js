import Express  from "express";

const routesProducts = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando los vehiculos');
    } else {
      res.json(result);
    }
  };

  
  