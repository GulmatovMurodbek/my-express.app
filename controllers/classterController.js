import Classter from "../models/classterModel.js";

export let getClasster=async(req,res)=>
{
    try {
        let classters=await Classter.find()
        res.status(200).json(classters)
    } catch (error) {
        console.error(error);
        
    }
}

export let postClasster=async(req,res)=>
{
    try {
        let createdClasster=await Classter.create(req.body)
        res.status(201).json(createdClasster)
    } catch (error) {
        console.error(error)
    }
}