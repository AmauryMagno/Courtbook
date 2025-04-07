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

routes.post("/reservations", verificarToken, ReservationsController.create);
routes.get("/reservations", verificarToken, ReservationsController.findAll);
routes.get("/reservations/:id", verificarToken, ReservationsController.findOne);
routes.patch(
  "/reservations/:id",
  verificarToken,
  ReservationsController.update
);
routes.delete(
  "/reservations/:id",
  verificarToken,
  ReservationsController.delete
);

export default routes;
