const express=require('express');
const app=express();
const mongoose=require('../mongoose');
const catagory=require('../models/catagory');
const product=require('../models/product');
const orderHistory=require('../models/oderhistory');
const mail=require('../middleware/mail.js')
const port=process.env.PORT||3001
app.use(express.json());
app.post('/insertcatagory',async(res,req)=>{
    try{
        console.log("Inserted into cart")
        console.log(catagory)
        catagory.collection.insertMany(req.body)
        res.send(200).status("saved data successfully")
    }
    catch(e){
        res.send(400).status(e)

    }
})

app.post('/product',async(res,req)=>{
    const catagory=new Product(req.body)
    try{
        let data=await product.insertMany(data)
        await app.save(data)
        res.status(200).send('product')
    }
    catch(e){
        res.status(400).send(e)
    }
})

app.get('/shopping_cart123/product/read',async(res,req)=>{
     try{
        let data=await catagory.find({})
        console.log(data)
        res.send('data')
    }
    catch(e){
        res.send(e)
})

app.get('/shopping_cart123/productcat/read',async(res,req)=>{
   try{

    const data=await catagory.find({})
    .populate('product')
    .exec(function(err,result){
        if(result){
            res.send(result)
        }
        else{
            res.send(500).send('product not found')
        }
    }
    catch(e){
        res.send(e)
        
    }
})
app.get('/shopping_cart123/expensiveproduct/read'async(res,req)=>{
    try{
        const data=await catagory.find({})
    .populate('product')
    .exec(function(err,result){
        if(result){
            res.send(result)
        }
        else{
            res.send(200).send("error happens")
        }
    }
        catch(e){
            res.send(e)
        }

    })
    app.post('/shopping_cart123/product/insert',async(res,req)=>{

        const post =await req.body
        try{
            const data =await product.insertMany(data)
            res.send(data)
        }
        catch(e){
            res.send(e)
        }
    })
    app.get('/shopping_cart123/product/read',async(res,req)=>{
        try{
            const post =await product.find({})
            res.send(data)
            }
        
        catch(e){
            res.send(e)
        }
    })
    app.get('/shopping_cart123/orderview',async(res,req)=>{
        try{
            const data=await order.find({})
            .populate(
            {
                path:'catagoryId'
               populate{ path:'productId'}

            })
        
        
            .exec(function(err,res){
                console.log(err)
                res.satus(400).send(res)  

            })     
         }
         catch(e){
             res.send(e)

         }
    
        })
    app.get('/shopping_cart123/sevendayhistory',async(res,req)=>{
        const date=new Date();
        const result= await order.find({
            createdAtDay={$gte:date.getTime()-1000*60*60*24*3}
        })
        .populate({
            path:'productId'
        })
        .populate({
            path:'productId',
            populate:{
                path:'catagoryId',
                options:{select:{name:1,_id=-1}}

            }
        })
        res.send(result)
    })
 /*app.get('/shopping_cart123/productfind/like/:name',async(req,res)=>{
     const name1=req.param.name
     consle.log(name1)
     const b=RegExp('.*'+name1+'.*','i')
     try{
         const data=await productColection.find({"name":b})
         .populate('catagoryId')
         .exec(function(err,result)
         {
             if(err){

             console.log(err)
         }
         else{
             console.log(result)
             res.send(result)
         }
         catch(e){
             res.send(e)
     }
})*/


app.get('/shopping_cart123/resultpage', async (req, res, next) => {

        const resPerPage = 5;
        const page = req.params.page || 1; 
try {
 if (req.query.search) {

   const searchQuery = req.query.search,
   regex = new RegExp(escapeRegex(req.query.search));

    const foundProducts = await Product.find({name:regex})
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
    const numOfProducts = await Product.count({name: regex});

        }
    }
})
app.post('/extensions',async(req,res)=>{
        const search = new RegExp(req.query.search, "i")
        console.log(search)
        try{
        const products= await product.find({name: search})
        res.send(products);
        } catch(e) {
            res.send(e)
        }
    })
    app.post('/sendmail',async(req,res)=>{
        const order=await orderHistory.findById(req.param.id).populate({
            path:"product",
            populate:"catagories"
        });
        res.send(order)
    
    })
    app.listen(port, () => {
    console.log('Server is up on port ' + port)
    })

