import { Router } from "express";
import UserRoutes from "./userRoutes.js"
import PostRoutes from "./postRoutes.js"
import CommentRoutes from "./commentRoutes.js"

const routes= new Router();
// API User
routes.use("/api/user", UserRoutes)

// API Posts
routes.use("/api/post", PostRoutes)

// API Comments
routes.use("/api/comment", CommentRoutes)


export default routes;
