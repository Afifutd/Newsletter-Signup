var bodyParser = require('body-parser');
const { application } = require('express');
var express = require("express");
const app = express();
const https = require('https');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName =req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    url = "https://us8.api.mailchimp.com/3.0/lists/511156a7e5";

    const options = {
        method:"POST",
        auth:"Afif2:7eaebfe029b0ca57baf78c8e1ee3f6ff-us"
    }
    const request= https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");

        }
        
        
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
    console.log(firstName,lastName,email);
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
console.log("port runnung on 3000");
});

// API Key
// 7eaebfe029b0ca57baf78c8e1ee3f6ff-us8
// list id
// 511156a7e5
// sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z