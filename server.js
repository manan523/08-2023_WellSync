const express=require("express");
const cors=require("cors");
const app=express();
const dbcon=require("./config/dbcon");
const userdataroutes=require("./routes/route");
const PORT=process.env.PORT || 5001;

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}));    
app.use(cors());
app.use("/",userdataroutes);

app.get('/',function(req,res){
    res.sendFile("index.html");
})

app.listen(PORT, () => {
    console.log("server is live");
})
dbcon();




