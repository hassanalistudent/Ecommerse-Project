import express from "express";
const router = express.Router()
import {updateUserById,getUserById, createUser,loginUser,logoutCurrentUser,getAllusers,getCurrentUserProfile,updateCurrentUserProfile,deleteUserById } from "../controlers/userController.js";
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";



router.route("/").post(createUser).get(authenticate,authorizeAdmin,getAllusers);
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutCurrentUser);
router.route("/profile")
.get(authenticate,getCurrentUserProfile)
.put(authenticate,updateCurrentUserProfile);

// admin routes
router.route('/:id')
.delete(authenticate,authorizeAdmin,deleteUserById)
.get(authenticate,authorizeAdmin,getUserById)
.put(authenticate,authorizeAdmin,updateUserById)

export default router;