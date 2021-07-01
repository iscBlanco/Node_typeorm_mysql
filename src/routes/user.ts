import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import {Router} from "express"

import {UserController} from "../controller/UserController"

const routes = Router();

//Get all users
routes.get("/", [checkJwt, checkRole(['admin'])], UserController.getAll);
//Get one user
routes.get("/:id", [checkJwt, checkRole(['admin'])], UserController.getById);
//Create a new user
routes.post("/", UserController.newUser);
//Edit a user
routes.patch("/:id", [checkJwt, checkRole(['admin'])], UserController.editUser);
//Delete a user
routes.delete("/:id", [checkJwt, checkRole(['admin'])], UserController.deleteUser);


export default routes;