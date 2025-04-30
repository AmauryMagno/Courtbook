import { Router } from "express";
import ReservationsController from "./controllers/ReservationsController.js";
import { verificarToken } from "./middlewares/authorization.js";
import UsersController from "./controllers/UsersController.js";
import QuadrasController from "./controllers/QuadrasController.js";
import AuthenticateController from "./controllers/AuthenticateController.js";

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

routes.post("/authenticate", AuthenticateController.authenticate);

routes.post("/users", UsersController.createUsers);
routes.post("/courts", verificarToken, QuadrasController.createQuadras);

export default routes;
