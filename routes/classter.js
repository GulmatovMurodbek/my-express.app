import express from 'express'
import { getClasster, postClasster } from '../controllers/classterController.js'
let ClassterRouter=express.Router()

ClassterRouter.get("/classters",getClasster)
ClassterRouter.post("/classters",postClasster)

export default ClassterRouter
