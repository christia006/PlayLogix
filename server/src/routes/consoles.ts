import { Router } from "express";
import consoleRouter from "../controllers/consoles";

const router = Router();

router.route("/").get(consoleRouter.getAll).post(consoleRouter.createConsole);

export default router;
