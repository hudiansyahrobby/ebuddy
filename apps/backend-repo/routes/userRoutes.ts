import { updateUserSchema, userAuthSchema } from "@repo/types";
import { Router } from "express";
import userController from "../controller/userController";
import authMiddleware from "../middleware/authMiddleware";
import { validateData } from "../middleware/validationMiddleware";

const router: Router = Router();

router.post("/signup", validateData(userAuthSchema), userController.signup);

router.post("/login", validateData(userAuthSchema), userController.login);

router.post("/logout", authMiddleware, userController.logout);

router.put(
  "/update-user-data",
  authMiddleware,
  validateData(updateUserSchema),
  userController.updateUserData
);

router.get("/fetch-user-data", authMiddleware, userController.fetchUserData);

export default router;
