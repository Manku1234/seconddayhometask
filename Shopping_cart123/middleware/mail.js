
        var handlebars=require(./middleware/app.hbs);
        var nodemailer = require('nodemailer');
        var hbs= require('nodemailer-express-handlebars');
        var options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views/email/',
                defaultLayout : 'template',
               
            },
            viewPath: 'views/email/',
            extName: '.hbs'
        };
        var sgTransport = require('nodemailer-sendgrid-transport');
     
        
        var mailer = nodemailer.createTransport(sgTransport(send_grid));
        mailer.use('compile', hbs(options));
        mailer.sendMail({
            from: 'manjari040398@gmail.com',
            to: 'malayks1954@gmail.com',
            subject: 'Order details',
            template: 'email_body',
            context: {
                 variable1 : 'value1', 
                 variable2 : 'value2',
                 variable3: 'value3',
                 variable4:'value4'

            }
        }, function (error, response) {
            console.log(' mail sed' + to);
            mailer.close();
        });
