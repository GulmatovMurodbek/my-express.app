import {model,Schema} from 'mongoose'

let classterSchema=new Schema({
    classterName:{type:String,required:true},
    classterIcon:{type:String,required:true},
})
let Classter=model('Classter',classterSchema)

export default Classter