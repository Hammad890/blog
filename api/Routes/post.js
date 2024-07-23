import {Router} from "express";
import { posts,PostById,updatedPost,getPost } from "../controllers/post.js";


const route = Router();

route.post("/",posts)
route.get("/",getPost)
route.get ("/:id",PostById)
route.put("/",updatedPost)

export default route;