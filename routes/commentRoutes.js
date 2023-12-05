import Router from "express"
import { createComment, getComment, getCommentByID, updateComment } from "../Controller/CommentController.js";

const router = new Router();

router.get('/', getComment);
router.get('/:id', getCommentByID);
router.post('/create', createComment);
router.put('/update', updateComment);
export default router;