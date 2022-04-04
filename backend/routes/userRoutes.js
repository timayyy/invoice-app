import express from "express";
import {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    updateUserProfile,
    deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, deleteUser)

export default router;