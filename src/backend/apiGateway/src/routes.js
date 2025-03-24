import { Router } from "express";
import ReservationsController from "./controllers/ReservationsController.js";

const routes = new Router()

routes.get('/', (req,res)=>{
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
})

routes.post('/reservations',ReservationsController.create)


export default routes