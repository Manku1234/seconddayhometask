function genratioOtp(email){
    const nodemailer=require('nodemailer')
    const smtpTransport=require('nodemailer-smtp-transport')
    var otpGenerator=require('otp-generator')
    const otp=otpGenerator.generate(5,{upperCase:false,specialChars:false,alphabet:false})
    console.log(otp)
    let transporter=nodemailer.createTransport(smtpTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        auth:{
            user:process.env.emailid,
            password:process.env.password
        }

    }))
    let mailoption={
        from:'manjari040398@gmail.com',
        to:email,
        subject:'testing',
        text:otp
    }
    transporter.sendMail(mailoption,function(err,data)
    {
        if(err){
            console.log('error occure',err)

        }
        else{
            console.log('email sent')
        }
    })
    module.exports=generatioOtp;

















}