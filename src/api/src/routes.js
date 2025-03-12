const { Router } = require("express");

const routes = new Router()

routes.get('/', (req,res)=>{
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
})


module.exports = routes;