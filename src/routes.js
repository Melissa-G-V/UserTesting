const express = require("express");


const userValidator = require("./validators/user");
const UserController = require("./controllers/UserController");


const routes = express.Router();


routes.post("/user", userValidator.create, UserController.store);
routes.get("/user", UserController.index);

routes.get("/user/:id", UserController.search);
routes.delete("/user/:id", UserController.delete);

routes.put("/user/:id", userValidator.create, UserController.update);

module.exports = routes;
