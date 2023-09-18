const mongoose = require("mongoose");
const udschema = require("../models/model");
const fs=require('fs');
let data=null;

module.exports.registeruser=function(req,res){
    try{    
        const{
            username,password,email,workout
        }=req.body;
        udschema.create({
            username,password,email,workout
        });
        res.sendFile(__dirname+"/regsuccess.html");
    }catch(err){
        console.log("Error registering the user !");
    }
}
module.exports.loginuser=async function(req,res){
    try{    
        const uname=req.body.username; 
        const pass=req.body.password;   
        data=await udschema.findOne({username:uname,password:pass}); 
        if(data==null){
            res.send("<h1> User not found. Please Go Back and Register");
        }
        else{
            fs.writeFileSync("./public/info.json",JSON.stringify(data));
            // res.send("<h1> Userfound. ");
            res.sendFile(__dirname+"/tracker.html");
        }
    }catch(err){
        console.log("Error registering the user !");
    }
}
module.exports.getjson=async function given(req,res){
    try{       
        console.log(data);
        res.send(data);
    }catch(err){
        console.log("Error");
    }
}
module.exports.addinfo=async function(req,res){
    try{
        let rawdata=fs.readFileSync("./public/info.json");
        data=JSON.parse(rawdata);
        const{
            steps,sleep,calorie
        }=req.body;
        console.log(steps,sleep,calorie);
        let st=parseInt(steps,10);let sl=parseFloat(sleep,10);let ca=parseFloat(calorie,10);
        await udschema.findOneAndUpdate({username:data.username,password:data.password},{$pop:{steps:-1,sleep:-1,calorie:-1}});
        data=await udschema.findOneAndUpdate({username:data.username,password:data.password},{$push:{steps:st,sleep:sl,calorie:ca}},{new:true});
        res.sendFile(__dirname+"/tracker.html");
    }catch(err){
        console.log("Error");
    }
}
