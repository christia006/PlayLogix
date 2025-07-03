import { Router } from "express";
import genresController from "../controllers/genres";

const router = Router();

router
  .route("/")
  .get(genresController.getAll)
  .post(genresController.createGenre);

export default router;
