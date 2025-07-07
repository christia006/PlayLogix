import { Router } from "express";
import reviewsController from "../controllers/reviews";

const router = Router();

router
  .route("/")
  .get(reviewsController.getAll)
  .post(reviewsController.addReview);

router
  .route("/:reviewId")
  .patch(reviewsController.getReviewId, reviewsController.editReview)
  .delete(reviewsController.getReviewId, reviewsController.deleteReview);

export default router;
