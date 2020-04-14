const express= require('express')
const mongoose=require('mongoose')
const app=express()
mongooos.connect("mongodb://localhost:27017/userreg",{
    userNewUrlParser:true,
    userUnifiedTopology:true
},(error) =>{

if(!error){
console.log("connected to db")
}
else{

console.log("connection failure")
}

})
