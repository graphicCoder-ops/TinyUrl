const uidlib =require('uid');
const express = require("express");
const con = require("./config/db");
require('dotenv').config();

const app = express();

app.use(express.json());

//app.use(express.static("static"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'\\static\\main.htm');
});

app.get("/main.css",(req,res)=>{
    res.sendFile(__dirname+'\\static\\main.css');
});

app.get("/client.js",(req,res)=>{
    res.sendFile(__dirname+'\\static\\client.js');
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'\\static\\main.htm');
});
app.post("/api/linkgenerator",(req,res)=>{
    shortUrlID = uidlib.uid(8);
    longUrl = req.body.longURL;
    console.log(shortUrlID+"     "+longUrl);
    con.query(`insert into urlmap values("${shortUrlID}","${longUrl}")`,(err,result)=>{
        if(err) console.log(err);
    })

    res.json({short:shortUrlID,long:longUrl});
})

app.get("/:uid",(req,res)=>{
    uid = req.params.uid;
    con.query(`select * from urlmap where urlID = "${uid}"`,(error, result)=>{
        if(result.length!=0){
            res.redirect(result[0].longurl);
        }else{
            res.status(404);
            res.send("Not worked!");
            console.error("Not Found")
        }
    })
});

app.listen(process.env.PORT,()=>{
    console.log("Our website is hosting at http://localhost:"+process.env.PORT);
});