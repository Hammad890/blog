import {Router} from "express";
import {login,register,logout,getProfile} from "../controllers/user.js";


const route = Router();

route.post("/reg",register)
route.post("/login",login)
route.get("/profile",getProfile)
route.post("/logout",logout)

export default route;