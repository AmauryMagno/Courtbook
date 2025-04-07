import { Router } from "express";
import ReservationsController from "./controllers/ReservationsController.js";
import { verificarToken } from "./middlewares/authorization.js";

const routes = new Router();

routes.get("/", (req, res) => {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

routes.post("/reservations", ReservationsController.create);
routes.get("/reservations", ReservationsController.findAll);
routes.get("/reservations/:id", ReservationsController.findOne);
routes.patch("/reservations/:id", ReservationsController.update);
routes.delete("/reservations/:id", ReservationsController.delete);

export default routes;
