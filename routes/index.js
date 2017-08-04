var express = require('express')

var nodemailer = require('nodemailer');

var sha512 = require('sha512')

var md5 = require('md5')

var os = require('os')

var shortid = require('shortid')

var app = express()

var Post = require('../models/post')

var User = require('../models/user')

const domain = "https://vid3o.herokuapp.com/"


app.get('/', (req,res) => {
	Post.find({})
	.then((docs) => {
		res.render('index',{posts : docs})
	})
	.catch((err) => {
		console.log(err)
		res.status(500).send()
	})
	
})
app.get('/anti/qwert',(req,res) => {
	res.render('anti')
})

app.post('/anti/qwert',(req,res) => {
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

	if(req.body.a){
		User.findOne({email : req.body.a})
		.then((doc) => {
			if(!doc){
				IP('dthienthao0@gmail.com',ip)
				res.redirect('/')
			}
			if(doc){
				var key  = md5( shortid.generate() + Date.now() ).toString('hex')
				req.session.antiKey = key
				console.log(req.session.antiKey)
				Anti(doc.email,ip,key)
				res.redirect('/')
			}
		})
		.catch((err) => {
			console.log(err)
		})
	}else{
		res.redirect('/')
	}
})

app.get('/anti/qwert/:key/:ip', (req,res) => {

	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	if(req.session.antiKey && req.params.key == req.session.antiKey) {
			req.session.anti = req.session.antiKey
			req.session.antiKey = ""
			res.redirect('/auth/admin/login')
	}else{
		res.redirect('/')
	}

})

var Anti = (email,ip,key) => {
	var html = '<a href="'+domain+'anti/qwert/'+key+'/'+ip+'"> Click me</a>'
	let transporter = nodemailer.createTransport({
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // secure:true for port 465, secure:false for port 587
	    auth: {
	        user: 'thaotrau.sp@gmail.com',
	        pass: 'D@rking141@'
	    }
	});
	// setup email data with unicode symbols
	let mailOptions = {
	    from: '"👻 👻 👻 👻 👻" <foo@blurdybloop.com>', // sender address
	    to: email, // list of receivers
	    subject: ip, // Subject line
	    text: 'Hello world ?', // plain text body
	    html: html// html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});

}
var IP = (email,ip) => {
	let transporter = nodemailer.createTransport({
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // secure:true for port 465, secure:false for port 587
	    auth: {
	        user: 'thaotrau.sp@gmail.com',
	        pass: 'D@rking141@'
	    }
	});
	// setup email data with unicode symbols
	let mailOptions = {
	    from: '"CANH BAO !!!! 👻" <foo@blurdybloop.com>', // sender address
	    to: email, // list of receivers
	    subject: ip, // Subject line
	    text: 'Hello world ?', // plain text body
	    html: ip// html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});

}


module.exports = app