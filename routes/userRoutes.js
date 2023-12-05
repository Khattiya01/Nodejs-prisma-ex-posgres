import { Router } from "express";
import { createUser, deleteUser, getUser, getUserByID, updateUser } from "../Controller/UserController.js";

const router = new Router();

router.get('/', getUser)
router.get('/:id', getUserByID)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router