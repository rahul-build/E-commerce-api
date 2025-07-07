import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  updatePasswordController,
  updateProfileController,
  updateProfilePiController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);

// router.put("/profile-update", isAuth, updateProfileController);
router.put("/profile-update", isAuth, updateProfileController);
router.put("/update-password", isAuth, updatePasswordController);
router.put("/update-picture", singleUpload, updateProfilePiController);

export default router;
