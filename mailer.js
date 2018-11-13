var express = require('express'),
    nodemailer = require("nodemailer");

app = express.createServer();
app.use(express.bodyParser());

app.post('/formProcess', function(req, res){
    var data = req.body;
    
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth:{
            user:"AlexStolzoff@gmail.com",
            pass:"Shes@ys88"
        }});
    
    smtpTransport.sendMail({
        from:"Send Name",
        to: "Receiver Name",
        subject: "Emailing Test",
        html: "here is your data"
    }, function(error,reposnse){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent")
        }
        smtpTransport.close();
    });
});