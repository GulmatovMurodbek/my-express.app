import { model, Schema } from "mongoose";

let SkillsSchema = new Schema({
    technical:[String],
    soft:[String]
})
let RoadMepSchema = new Schema ({
    step:Number,
    title:String,
    tasks:[String]
})
let LearningResourcesSchema = new Schema({
    books:[String],
    courses:[String],
    blogs:[String]
})
let SalarySchema = new Schema({
    junior:String,
    mid :String,
    senior:String
})
let UnivercitySchema = new Schema({
    name:String,
    city:String,
    notes:String
})
let TotalCareerSchema = new Schema ({
      name:{type:String,required:true},
      descrition:String,
      purpose:String,
      skills:SkillsSchema,
      technologies:[String],
      roadmap:[RoadMepSchema],
      projectsExamples:[String],
      learningResources:LearningResourcesSchema,
      careerOpportunities:[String],
      salaryAndMarket:SalarySchema,
      relatedSpecializations:[String],
      classterId:{type:Schema.ObjectId,ref:"Classter",required:true},
      advice:[String],
      certification:[String],
      universities:[UnivercitySchema]
})
let Career = model("Careers",TotalCareerSchema)
export default Career