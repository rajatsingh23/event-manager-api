import express from "express"
import { createUser, getUserById, listUsers } from "../controller/userController.js";


const router = express.Router();

router.post("/user", createUser);
router.get("/user/list", listUsers);
router.get("/user/:userId", getUserById);



export default router;