import { Router } from "express";
import { createPost, deletePost, getPost, getPostByID, updatePost } from "../Controller/PostController.js";

const router = new Router();

router.get('/', getPost)
router.get('/:id', getPostByID)
router.post('/create', createPost)
router.put('/update', updatePost)
router.delete('/delete/:id', deletePost)

export default router