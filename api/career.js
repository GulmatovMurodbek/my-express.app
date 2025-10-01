import express from "express" 
import { deleteCareer, getById, getCareers, postNewCareers } from "../controllers/careersController.js"
let CareerRouter=express.Router()

CareerRouter.get("/careers",getCareers)
CareerRouter.post("/careers",postNewCareers)
CareerRouter.delete("/careers/:id",deleteCareer)
CareerRouter.get("/careers/:id",getById)
export default CareerRouter