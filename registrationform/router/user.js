    const generatioOtp=require('../middleware/generatioOtp');
    const express=require('express')
    const bcrypt=require('bcrypt')
    const app=express()
    const User=require('../model/usermodel')
    const jwt=require('jsonwebtoken')
    const multer=require('multer');
    const path=require('path')
    const helpers=require('../model/helper')
    var otpGenerator=require('otp-generator')

    router.post('/register',async(res,req)=>{

        const user=new User(req.body)
        const email=req.body.email;
        generatioOtp(email);
        try{
            await user.save()
            res.send(user)
            res.status(200).send()
        }
        catch{
            res.status(400).send()
        }
    })

    router.get('/register',async(req,res)=>{
        try{
            const post=await User.find({})
        
        res.post()
        }
        catch{
        res.status(500).send()
        }
    })

    router.delete('/registration/:id',async(req,res)=>{
        try{
            const post=await User.findOne({_id:req.param.id})
            await user.remove({_id:post})
            res.send(post)
            res.status(200).send()
        }
        catch{
            res.status(500).send()
        }  
    })
    router.use(express.static(_dirname+'/public'));
    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'uploads/');
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
        }
    })
    router.post('/upload_profile_pic',(res,req)=>{
        let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('profile_pic');
        upload(res,req,function(err){
            if(req.fileValidatioError){
                return res.send(req.fileValidatioError);
            }
            else if(!req.file){
                return res.send('Please select an image for uploading');
            }
            else if(err instanceof multer.MulterError){
                return res.status(err);
            }
            else if(err){
                return res.status(err);
            }

            res.send('you have uploaded this image:<hr/><img.src="${req.file.path}",width="500><hr/><a herf="./"'upload another image</a>');
        })
    })

        router.put('./registration/:id',async(req,res)=>{
        
            const post=await User.findOne({_id:req.param.id})
            post.name=req.body.name
            post.email=req.body.email
            await user.remove({_id:post})
            res.send(post)
            const user=new User(req.body)
            try{
                await user.save()
                res.send(user)
                res.status(200).send()
            }
            catch{
                res.status(400).send()
            }
            
    })
    router.post('/registration/log',async(res,req)=>{

        User.find({name:req.body.name})
        .exec()
        .then(user=>
            {
                if(user.name<1)
                {
                    res.status(400).send('autthentication failed')
                }
                bcrypt.compare(req.body.password,user[0].password,err(result)=>{
                    if(err){
                        res.status(400).send('secondtime authentication failed')
                    }
                    if(result){
                        const token=jwt.sign(
                            {
                            name:user[0].name,
                            userId:user[0]._id
                        },
                        process.env.JWT_KEY,{
                            expiresIn:"1h"
                        })
                        return res.status(200).json({
                            message:"Succesfully registerd",
                            token:token
                        })

                    })


                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).send("an error occured")
                }
            })
module.exports=router

