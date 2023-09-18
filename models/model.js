const mongoose=require("mongoose");

let steparr=new Array(7).fill(0); 
let sleeparr=new Array(7).fill(0); 
let caloriearr=new Array(7).fill(0); 
const udschema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            maxLength:50
        },
        password:{
            type:String,
            required:true,          
            maxLength:50
        },
        email:{
            type:String,
            required:true
        },
        steps:{
            type:Array,
            default: steparr
        },
        sleep:{
            type:Array,
            default: sleeparr
        },
        calorie:{
            type:Array,
            default:caloriearr
        },
        workout:{
            required:true,
            type:String,
        }
    }
)
module.exports=mongoose.model("userdata",udschema)