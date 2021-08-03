import {Router} from "express"
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

// login
router.post("/login", AuthController.login);

// Change password
router.post("/change-password",[checkJwt, checkRole(['admin'])],AuthController.changePassword);


export default router;