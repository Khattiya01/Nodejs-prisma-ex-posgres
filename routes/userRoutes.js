import { Router } from "express";
import { createUser, deleteUser, getUser, getUserByID, updateUser, login } from "../Controller/UserController.js";

const router = new Router();

router.get('/', getUser)
router.get('/:id', getUserByID)
router.post('/create', createUser)
router.post('/login', login)
router.put('/update', updateUser)
router.delete('/delete/:id', deleteUser)

export default router