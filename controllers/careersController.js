import Career from "../models/careerModel.js";


export let getCareers = async (req,res)=>
{
    try {
       let careers=await Career.find()
       res.status(200).json(careers)
    } catch (error) {
        console.error(error);
        
    }
}
export let postNewCareers = async (req,res)=>
{
    try {
        let createCareer = await Career.create(req.body)
        res.status(201).json(createCareer)
    } catch (error) {
        console.error(error);
    }
}

export let deleteCareer=async (req,res)=>
{
    try {
        let deletedCareer=await Career.findByIdAndDelete(req.params.id)
        res.status(201).json(deletedCareer)
    } catch (error) {
        console.error(error);
    }
}

export let getById=async(req,res)=>
{
    try {
        let career=await Career.findById(req.params.id)
        res.status(201).json(career)
    } catch (error) {
        console.error(error);
    }
}
