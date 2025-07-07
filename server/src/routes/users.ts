import { Router, Request } from "express";
import usersController from "../controllers/users";
import authController from "../controllers/auth";
import multer from "multer";
import path from "path";

const router = Router();

const multerStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/users"));
  },
  filename: (req: Request, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only images allowed"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.route("/").get(usersController.getUsers);

router.route("/user").get(usersController.getUserFromToken);

router
  .route("/:id")
  .get(usersController.getUserId, usersController.getUser)
  .patch(usersController.getUserId, usersController.editUserNameAndEmail);

router
  .route("/dashboard/:id")
  .patch(usersController.getUserId, usersController.editUserProfileFromDashboard)
  .delete(usersController.getUserId, usersController.deleteUser);

router
  .route("/reviews/:id")
  .get(usersController.getUserId, usersController.getUserReviews);

router
  .route("/disable/:id")
  .patch(usersController.getUserId, usersController.disableAccount);

router
  .route("/image/:id")
  .patch(
    usersController.getUserId,
    upload.single("image"),
    usersController.updateUserImage
  );

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);

export default router;
