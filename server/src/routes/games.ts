import { Router } from "express";
import gamesController from "../controllers/games";

const router = Router();

router.route("/").get(gamesController.getAll).post(gamesController.createGame);

router
  .route("/:id")
  .get(gamesController.getGameId, gamesController.getSingleGame)
  .delete(gamesController.getGameId, gamesController.deleteGame)
  .patch(gamesController.getGameId, gamesController.editGame);

export default router;
